import { GPU, LLMModel, Quantization, CalculationResult, PerformanceRating } from "@/types";

export function calculate(
  gpu: GPU,
  model: LLMModel,
  quant: Quantization,
  gpuCount: number
): CalculationResult {
  const totalVRAMAvailable = gpu.vramGB * gpuCount;
  const memoryEfficiency = gpu.memoryEfficiency ?? 1.0;
  const totalBandwidth = gpu.bandwidthGBs * gpuCount * memoryEfficiency;

  // ─── VRAM calculation ────────────────────────────────────
  const effectiveParams = model.totalParams;
  const modelVRAM = (effectiveParams * quant.bitsPerWeight) / 8;
  const activeP = model.activeParams ?? model.totalParams;
  const kvCache = 0.015 * activeP + 0.3;
  const overhead = 0.5;
  const totalVRAM = modelVRAM + kvCache + overhead;
  const fitsInVRAM = totalVRAM <= totalVRAMAvailable;

  // ─── FP4 compatibility check ───────────────────────────
  const isFp4Quant = quant.requiresHardwareSupport === true;
  const gpuSupportsFp4 = gpu.fp4Capable === true;
  const fp4Mismatch = isFp4Quant && !gpuSupportsFp4;

  // ─── Decode TPS calculation ────────────────────────────
  const activeParams = model.activeParams ?? model.totalParams;
  const bytesPerParam = quant.bitsPerWeight / 8;
  const activeModelSize = activeParams * bytesPerParam;

  // Base TPS from bandwidth / active model size
  let tps = totalBandwidth / activeModelSize;

  // Efficiency scaling based on param-to-bandwidth ratio
  const paramToBW = activeParams / totalBandwidth;
  if (paramToBW > 0.1) {
    tps *= Math.max(0.3, 1 - (paramToBW - 0.1) * 2);
  }

  // Quantization adjustment (penalty for very low quants)
  if (quant.bitsPerWeight < 4) {
    tps *= 0.85 + (quant.bitsPerWeight - 2) * 0.075;
  }

  // Architecture-specific adjustments
  if (gpu.tier === "Apple Silicon") {
    tps *= 0.85;
  } else if (gpu.tier === "AMD Consumer") {
    tps *= 0.88;
  } else if (gpu.tier === "Intel") {
    tps *= 0.80;
  } else if (gpu.tier === "AMD Datacenter") {
    tps *= 0.95;
  }

  // MoE boost: inference only activates a fraction of experts
  if (model.isMoE && model.activeParams) {
    tps *= 1.3;
  }

  // Multi-GPU scaling efficiency
  if (gpuCount > 1) {
    const efficiency = 1 - (gpuCount - 1) * 0.05;
    tps *= Math.max(efficiency, 0.7);
  }

  // VRAM overflow: severe penalty when model doesn't fit
  if (!fitsInVRAM) {
    tps *= 0.07;
  }

  // FP4 on non-capable hardware: severe decode penalty
  if (fp4Mismatch) {
    tps *= 0.15;
  }

  tps = Math.max(0.1, tps);

  // ─── Prefill TPS calculation ───────────────────────────
  let prefillTps: number | null = null;

  if (gpu.fp16TFLOPS !== undefined) {
    let effectiveTFLOPS = gpu.fp16TFLOPS;

    // FP4 on capable hardware doubles compute throughput
    if (isFp4Quant && gpuSupportsFp4) {
      effectiveTFLOPS *= 2;
    }

    // Multi-GPU scaling for compute (3% overhead per extra GPU, tighter than decode)
    if (gpuCount > 1) {
      effectiveTFLOPS *= gpuCount;
      const efficiency = 1 - (gpuCount - 1) * 0.03;
      effectiveTFLOPS *= Math.max(efficiency, 0.8);
    }

    // Prefill formula: effectiveTFLOPS * 1000 / (2 * activeParams)
    // activeParams is in billions, TFLOPS is 10^12 FLOPS
    // For a transformer, ~2 FLOPs per parameter per token
    prefillTps = (effectiveTFLOPS * 1000) / (2 * activeParams);

    // Architecture efficiency multipliers for prefill
    if (gpu.tier === "Apple Silicon") {
      prefillTps *= 0.90;
    } else if (gpu.tier === "AMD Consumer") {
      prefillTps *= 0.80;
    } else if (gpu.tier === "Intel") {
      prefillTps *= 0.70;
    } else if (gpu.tier === "AMD Datacenter") {
      prefillTps *= 0.88;
    } else {
      // NVIDIA Consumer & Datacenter
      prefillTps *= 0.92;
    }

    // VRAM overflow penalty same as decode
    if (!fitsInVRAM) {
      prefillTps *= 0.07;
    }

    // FP4 on non-capable hardware: severe prefill penalty
    if (fp4Mismatch) {
      prefillTps *= 0.10;
    }

    // Cap prefill at reasonable maximum for tiny models (< 1B active params)
    if (activeParams < 1) {
      prefillTps = Math.min(prefillTps, 50000);
    }

    prefillTps = Math.max(0.1, prefillTps);
    prefillTps = Math.round(prefillTps * 10) / 10;
  }

  // ─── Cost calculation ────────────────────────────────────
  let costPerToken: number | undefined;
  let costPer1MTokens: number | undefined;
  let electricityCostPerHour: number | undefined;

  if (gpu.priceUSD !== undefined) {
    const isCloudPriced = gpu.tier === "NVIDIA Datacenter" || gpu.tier === "AMD Datacenter";

    if (isCloudPriced) {
      // Price is per hour for cloud GPUs
      const pricePerHour = gpu.priceUSD * gpuCount;
      costPerToken = pricePerHour / (tps * 3600);
      costPer1MTokens = costPerToken * 1_000_000;
    }

    if (gpu.tdpWatts) {
      const electricityRate = 0.12; // $/kWh
      electricityCostPerHour = ((gpu.tdpWatts * gpuCount) / 1000) * electricityRate;
    }
  }

  const rating = getPerformanceRating(tps);
  const prefillRating = prefillTps !== null ? getPrefillRating(prefillTps) : null;

  return {
    tps: Math.round(tps * 10) / 10,
    prefillTps,
    modelVRAM: Math.round(modelVRAM * 100) / 100,
    kvCache: Math.round(kvCache * 100) / 100,
    overhead,
    totalVRAM: Math.round(totalVRAM * 100) / 100,
    availableVRAM: totalVRAMAvailable,
    fitsInVRAM,
    rating,
    prefillRating,
    costPerToken,
    costPer1MTokens: costPer1MTokens !== undefined ? Math.round(costPer1MTokens * 1000) / 1000 : undefined,
    electricityCostPerHour: electricityCostPerHour !== undefined ? Math.round(electricityCostPerHour * 1000) / 1000 : undefined,
  };
}

export function getPerformanceRating(tps: number): PerformanceRating {
  if (tps < 4) return "Unusable";
  if (tps < 12) return "Slow";
  if (tps < 30) return "Good";
  if (tps < 60) return "Excellent";
  if (tps < 100) return "Blazing";
  return "Insane";
}

export function getPrefillRating(tps: number): PerformanceRating {
  if (tps < 20) return "Unusable";
  if (tps < 100) return "Slow";
  if (tps < 500) return "Good";
  if (tps < 1500) return "Excellent";
  if (tps < 5000) return "Blazing";
  return "Insane";
}

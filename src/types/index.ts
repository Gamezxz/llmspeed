export type GpuTier =
  | "NVIDIA Consumer"
  | "NVIDIA Datacenter"
  | "AMD Consumer"
  | "AMD Datacenter"
  | "Intel"
  | "Apple Silicon";

export interface GPU {
  id: string;
  name: string;
  tier: GpuTier;
  vramGB: number;
  bandwidthGBs: number;
  priceUSD?: number;
  tdpWatts?: number;
  architecture: string;
  fp16TFLOPS?: number;
  fp4Capable?: boolean;
  memoryEfficiency?: number;
}

export interface LLMModel {
  id: string;
  name: string;
  family: string;
  totalParams: number;
  activeParams?: number;
  isMoE: boolean;
  expertCount?: number;
  architecture: string;
  isLegacy?: boolean;
}

export interface Quantization {
  id: string;
  name: string;
  bitsPerWeight: number;
  description: string;
  isHardwareNative?: boolean;
  requiresHardwareSupport?: boolean;
}

export interface CalculationResult {
  tps: number;
  prefillTps: number | null;
  modelVRAM: number;
  kvCache: number;
  overhead: number;
  totalVRAM: number;
  availableVRAM: number;
  fitsInVRAM: boolean;
  rating: PerformanceRating;
  prefillRating: PerformanceRating | null;
  costPerToken?: number;
  costPer1MTokens?: number;
  electricityCostPerHour?: number;
}

export type PerformanceRating =
  | "Unusable"
  | "Slow"
  | "Good"
  | "Excellent"
  | "Blazing"
  | "Insane";

export interface ComparisonEntry {
  gpu: GPU;
  model: LLMModel;
  quantization: Quantization;
  gpuCount: number;
  result: CalculationResult;
}

export interface CloudBaseline {
  provider: string;
  model: string;
  tps: number;
  costPer1MTokens: number;
}

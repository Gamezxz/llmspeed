"use client";

import { useState, useMemo } from "react";
import { GPU, LLMModel, Quantization } from "@/types";
import { quantizations } from "@/data/quantizations";
import { calculate } from "@/lib/calculator";

import Header from "@/components/Header";
import GpuSelector from "@/components/GpuSelector";
import ModelSelector from "@/components/ModelSelector";
import QuantSelector from "@/components/QuantSelector";
import MultiGpuConfig from "@/components/MultiGpuConfig";
import ResultsCard from "@/components/ResultsCard";
import SpeedPreview from "@/components/SpeedPreview";
import CostAnalysis from "@/components/CostAnalysis";
import ComparisonTable from "@/components/ComparisonTable";
import PerformanceChart from "@/components/PerformanceChart";
import Footer from "@/components/Footer";

export default function Home() {
  const [gpu, setGpu] = useState<GPU | null>(null);
  const [model, setModel] = useState<LLMModel | null>(null);
  const [quant, setQuant] = useState<Quantization>(quantizations[2]); // Q4_K_M default
  const [gpuCount, setGpuCount] = useState(1);

  const result = useMemo(() => {
    if (!gpu || !model) return null;
    return calculate(gpu, model, quant, gpuCount);
  }, [gpu, model, quant, gpuCount]);

  return (
    <main className="min-h-screen pb-8">
      {/* Subtle gradient bg */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12">
        <Header />

        {/* Selector Panel */}
        <div className="relative z-20 p-6 rounded-2xl bg-[#0d0d14]/95 border border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GpuSelector selected={gpu} onSelect={setGpu} />
            <ModelSelector selected={model} onSelect={setModel} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuantSelector selected={quant} onSelect={setQuant} />
            <MultiGpuConfig count={gpuCount} onChange={setGpuCount} />
          </div>
        </div>

        {/* Results Section */}
        {result && gpu && model ? (
          <div className="space-y-6">
            <ResultsCard result={result} />
            <SpeedPreview tps={result.tps} />
            <CostAnalysis result={result} modelName={model.name} />
            <PerformanceChart
              model={model}
              quantization={quant}
              gpuCount={gpuCount}
              currentGpu={gpu}
            />
            <ComparisonTable
              model={model}
              quantization={quant}
              gpuCount={gpuCount}
              currentGpu={gpu}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-20">⚡</div>
            <p className="text-slate-500 text-lg">
              Select a GPU and model above to see performance estimates
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

"use client";

import { Plus, Trash2, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { GPU, LLMModel, Quantization, ComparisonEntry } from "@/types";
import { gpus } from "@/data/gpus";
import { calculate } from "@/lib/calculator";
import { formatTPS, formatVRAM, getRatingBgClass } from "@/lib/utils";

interface Props {
  model: LLMModel;
  quantization: Quantization;
  gpuCount: number;
  currentGpu: GPU;
}

export default function ComparisonTable({ model, quantization, gpuCount, currentGpu }: Props) {
  const [entries, setEntries] = useState<GPU[]>([]);
  const [sortBy, setSortBy] = useState<"tps" | "vram" | "name">("tps");

  const allEntries: ComparisonEntry[] = [currentGpu, ...entries].map((gpu) => ({
    gpu,
    model,
    quantization,
    gpuCount,
    result: calculate(gpu, model, quantization, gpuCount),
  }));

  const sorted = [...allEntries].sort((a, b) => {
    if (sortBy === "tps") return b.result.tps - a.result.tps;
    if (sortBy === "vram") return a.result.totalVRAM - b.result.totalVRAM;
    return a.gpu.name.localeCompare(b.gpu.name);
  });

  const availableGpus = gpus.filter(
    (g) => g.id !== currentGpu.id && !entries.find((e) => e.id === g.id)
  );

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-400">GPU Comparison</span>
        <div className="flex gap-2">
          {availableGpus.length > 0 && (
            <select
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
              value=""
              onChange={(e) => {
                const gpu = gpus.find((g) => g.id === e.target.value);
                if (gpu) setEntries([...entries, gpu]);
              }}
            >
              <option value="" disabled>
                + Add GPU
              </option>
              {availableGpus.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.vramGB}GB)
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {allEntries.length > 1 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs uppercase">
                <th className="text-left py-2 pr-4">GPU</th>
                <th className="text-left py-2 pr-4">
                  <button onClick={() => setSortBy("tps")} className="flex items-center gap-1 hover:text-slate-300">
                    Speed <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-2 pr-4">
                  <button onClick={() => setSortBy("vram")} className="flex items-center gap-1 hover:text-slate-300">
                    VRAM <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-2 pr-4">Fits?</th>
                <th className="text-left py-2 pr-4">Rating</th>
                <th className="text-left py-2"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => (
                <tr key={entry.gpu.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 pr-4 text-slate-300 font-medium">
                    {entry.gpu.name}
                    <span className="text-slate-600 text-xs ml-1">({entry.gpu.vramGB}GB)</span>
                  </td>
                  <td className="py-3 pr-4 text-blue-300 font-mono font-medium">
                    {formatTPS(entry.result.tps)} t/s
                  </td>
                  <td className="py-3 pr-4 text-slate-400 font-mono">
                    {formatVRAM(entry.result.totalVRAM)} / {formatVRAM(entry.result.availableVRAM)}
                  </td>
                  <td className="py-3 pr-4">
                    {entry.result.fitsInVRAM ? (
                      <span className="text-green-400">Yes</span>
                    ) : (
                      <span className="text-red-400">No</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getRatingBgClass(entry.result.rating)}`}>
                      {entry.result.rating}
                    </span>
                  </td>
                  <td className="py-3">
                    {entry.gpu.id !== currentGpu.id && (
                      <button
                        onClick={() => setEntries(entries.filter((e) => e.id !== entry.gpu.id))}
                        className="text-slate-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8 text-slate-600 text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add GPUs above to compare performance side by side
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { GPU, LLMModel, Quantization } from "@/types";
import { gpus } from "@/data/gpus";
import { calculate } from "@/lib/calculator";
import { getRatingColor } from "@/lib/utils";
import { getPerformanceRating } from "@/lib/calculator";

interface Props {
  model: LLMModel;
  quantization: Quantization;
  gpuCount: number;
  currentGpu: GPU;
}

export default function PerformanceChart({ model, quantization, gpuCount, currentGpu }: Props) {
  const data = useMemo(() => {
    // Pick a representative set of GPUs across tiers
    const representativeIds = [
      currentGpu.id,
      "rtx-3090",
      "rtx-4070-ti-super",
      "rtx-4090",
      "rtx-5090",
      "rx-7900-xtx",
      "m4-pro",
      "m4-max",
      "a100-80gb",
      "h100-sxm",
      "h200",
    ];

    const selectedGpus = representativeIds
      .map((id) => gpus.find((g) => g.id === id))
      .filter((g): g is GPU => g !== undefined);

    // Remove duplicates (in case currentGpu is already in the list)
    const unique = [...new Map(selectedGpus.map((g) => [g.id, g])).values()];

    return unique
      .map((gpu) => {
        const result = calculate(gpu, model, quantization, gpuCount);
        return {
          name: gpu.name,
          tps: result.tps,
          rating: result.rating,
          isCurrent: gpu.id === currentGpu.id,
        };
      })
      .sort((a, b) => a.tps - b.tps);
  }, [model, quantization, gpuCount, currentGpu]);

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-slate-400 mb-4">
        <BarChart3 className="w-5 h-5" />
        <span className="text-sm font-medium">Performance Comparison</span>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              type="number"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              label={{ value: "Tokens/sec", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 11 }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={120}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#f1f5f9",
                fontSize: 13,
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${Number(value).toFixed(1)} t/s`, "Speed"]}
            />
            <Bar dataKey="tps" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getRatingColor(getPerformanceRating(entry.tps))}
                  opacity={entry.isCurrent ? 1 : 0.7}
                  stroke={entry.isCurrent ? "#fff" : "none"}
                  strokeWidth={entry.isCurrent ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

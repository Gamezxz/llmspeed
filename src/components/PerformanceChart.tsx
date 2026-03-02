"use client";

import { useMemo, useState } from "react";
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
import { getPerformanceRating, getPrefillRating } from "@/lib/calculator";

interface Props {
  model: LLMModel;
  quantization: Quantization;
  gpuCount: number;
  currentGpu: GPU;
}

type ChartMode = "decode" | "prefill";

export default function PerformanceChart({ model, quantization, gpuCount, currentGpu }: Props) {
  const [mode, setMode] = useState<ChartMode>("decode");

  const data = useMemo(() => {
    const representativeIds = [
      currentGpu.id,
      "rtx-3090",
      "rtx-4070-ti-super",
      "rtx-4090",
      "rtx-5090",
      "rx-7900-xtx",
      "m4-pro-24gb",
      "m4-max-48gb",
      "a100-80gb",
      "h100-sxm",
      "h200",
      "dgx-spark",
    ];

    const selectedGpus = representativeIds
      .map((id) => gpus.find((g) => g.id === id))
      .filter((g): g is GPU => g !== undefined);

    const unique = [...new Map(selectedGpus.map((g) => [g.id, g])).values()];

    return unique
      .map((gpu) => {
        const result = calculate(gpu, model, quantization, gpuCount);
        return {
          name: gpu.name,
          tps: result.tps,
          prefillTps: result.prefillTps,
          rating: result.rating,
          prefillRating: result.prefillRating,
          isCurrent: gpu.id === currentGpu.id,
        };
      })
      .sort((a, b) => {
        if (mode === "prefill") {
          return (a.prefillTps ?? 0) - (b.prefillTps ?? 0);
        }
        return a.tps - b.tps;
      });
  }, [model, quantization, gpuCount, currentGpu, mode]);

  const hasPrefillData = data.some((d) => d.prefillTps !== null);

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-400">
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm font-medium">Performance Comparison</span>
        </div>
        {hasPrefillData && (
          <div className="flex rounded-lg bg-white/5 border border-white/10 p-0.5">
            <button
              onClick={() => setMode("decode")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mode === "decode"
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Decode
            </button>
            <button
              onClick={() => setMode("prefill")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mode === "prefill"
                  ? "bg-purple-500/20 text-purple-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Prefill
            </button>
          </div>
        )}
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              type="number"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              label={{
                value: mode === "decode" ? "Tokens/sec (Decode)" : "Tokens/sec (Prefill)",
                position: "insideBottom",
                offset: -5,
                fill: "#64748b",
                fontSize: 11,
              }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={130}
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
              formatter={(value: any) => [
                `${Number(value).toFixed(1)} t/s`,
                mode === "decode" ? "Decode" : "Prefill",
              ]}
            />
            <Bar
              dataKey={mode === "decode" ? "tps" : "prefillTps"}
              radius={[0, 6, 6, 0]}
            >
              {data.map((entry, index) => {
                const value = mode === "decode" ? entry.tps : (entry.prefillTps ?? 0);
                const ratingFn = mode === "decode" ? getPerformanceRating : getPrefillRating;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={getRatingColor(ratingFn(value))}
                    opacity={entry.isCurrent ? 1 : 0.7}
                    stroke={entry.isCurrent ? "#fff" : "none"}
                    strokeWidth={entry.isCurrent ? 2 : 0}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

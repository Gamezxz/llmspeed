"use client";

import { Gauge, HardDrive, AlertTriangle } from "lucide-react";
import { CalculationResult } from "@/types";
import { formatTPS, formatVRAM, getRatingBgClass, getRatingColor } from "@/lib/utils";

interface Props {
  result: CalculationResult;
}

export default function ResultsCard({ result }: Props) {
  const vramPercent = Math.min((result.totalVRAM / result.availableVRAM) * 100, 100);
  const modelPercent = (result.modelVRAM / result.availableVRAM) * 100;
  const kvPercent = (result.kvCache / result.availableVRAM) * 100;
  const overheadPercent = (result.overhead / result.availableVRAM) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Speed Card */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <Gauge className="w-5 h-5" />
          <span className="text-sm font-medium">Token Generation Speed</span>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span
            className="text-5xl font-bold tabular-nums"
            style={{ color: getRatingColor(result.rating) }}
          >
            {formatTPS(result.tps)}
          </span>
          <span className="text-slate-400 text-lg mb-1">tokens/sec</span>
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRatingBgClass(result.rating)}`}>
          {result.rating}
        </span>
      </div>

      {/* VRAM Card */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <HardDrive className="w-5 h-5" />
          <span className="text-sm font-medium">VRAM Usage</span>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-4xl font-bold text-white tabular-nums">
            {formatVRAM(result.totalVRAM)}
          </span>
          <span className="text-slate-400 text-lg mb-1">
            / {formatVRAM(result.availableVRAM)}
          </span>
        </div>

        {!result.fitsInVRAM && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Model exceeds available VRAM — expect severe performance degradation</span>
          </div>
        )}

        {/* Stacked bar */}
        <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden flex">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${Math.min(modelPercent, 100)}%` }}
            title={`Model: ${formatVRAM(result.modelVRAM)}`}
          />
          <div
            className="h-full bg-purple-500 transition-all"
            style={{ width: `${Math.min(kvPercent, 100 - modelPercent)}%` }}
            title={`KV Cache: ${formatVRAM(result.kvCache)}`}
          />
          <div
            className="h-full bg-slate-500 transition-all"
            style={{ width: `${Math.min(overheadPercent, 100 - modelPercent - kvPercent)}%` }}
            title={`Overhead: ${formatVRAM(result.overhead)}`}
          />
        </div>
        <div className="flex gap-4 mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Model {formatVRAM(result.modelVRAM)}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> KV Cache {formatVRAM(result.kvCache)}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-500" /> Overhead {formatVRAM(result.overhead)}
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          VRAM utilization: {vramPercent > 100 ? ">100" : vramPercent.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

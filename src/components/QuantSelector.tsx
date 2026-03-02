"use client";

import { Layers } from "lucide-react";
import { Quantization } from "@/types";
import { quantizations } from "@/data/quantizations";

interface Props {
  selected: Quantization;
  onSelect: (q: Quantization) => void;
}

export default function QuantSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
        <Layers className="w-4 h-4" /> Quantization
      </label>
      <div className="flex flex-wrap gap-2">
        {quantizations.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q)}
            title={q.description}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selected.id === q.id
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20 hover:text-slate-300"
            }`}
          >
            <div>{q.name}</div>
            <div className="text-[10px] opacity-70">{q.bitsPerWeight} bpw</div>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Monitor } from "lucide-react";

interface Props {
  count: number;
  onChange: (count: number) => void;
}

const options = [1, 2, 3, 4, 6, 8];

export default function MultiGpuConfig({ count, onChange }: Props) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
        <Monitor className="w-4 h-4" /> GPU Count
      </label>
      <div className="flex gap-2">
        {options.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              count === n
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20 hover:text-slate-300"
            }`}
          >
            {n}×
          </button>
        ))}
      </div>
    </div>
  );
}

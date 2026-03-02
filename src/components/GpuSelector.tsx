"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Cpu } from "lucide-react";
import { GPU, GpuTier } from "@/types";
import { getGpusByTier } from "@/data/gpus";

const tierIcons: Record<GpuTier, string> = {
  "NVIDIA Consumer": "🟢",
  "NVIDIA Datacenter": "🟡",
  "AMD Consumer": "🔴",
  "AMD Datacenter": "🟠",
  "Intel": "🔵",
  "Apple Silicon": "⚪",
};

interface Props {
  selected: GPU | null;
  onSelect: (gpu: GPU) => void;
}

export default function GpuSelector({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const grouped = getGpusByTier();
  const q = search.toLowerCase();

  return (
    <div ref={ref} className="relative">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
        <Cpu className="w-4 h-4" /> GPU
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors text-left"
      >
        <span className={selected ? "text-white" : "text-slate-500"}>
          {selected ? `${tierIcons[selected.tier]} ${selected.name} (${selected.vramGB}GB)` : "Select a GPU..."}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-h-80 overflow-auto rounded-xl bg-[#151520] border border-white/10 shadow-2xl">
          <div className="sticky top-0 bg-[#151520] p-2 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search GPUs..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
          {Object.entries(grouped).map(([tier, gpuList]) => {
            const filtered = gpuList.filter((g) => g.name.toLowerCase().includes(q));
            if (filtered.length === 0) return null;
            return (
              <div key={tier}>
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white/[0.02]">
                  {tierIcons[tier as GpuTier]} {tier}
                </div>
                {filtered.map((gpu) => (
                  <button
                    key={gpu.id}
                    onClick={() => { onSelect(gpu); setOpen(false); setSearch(""); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors flex justify-between items-center ${
                      selected?.id === gpu.id ? "bg-blue-500/15 text-blue-300" : "text-slate-300"
                    }`}
                  >
                    <span>{gpu.name}</span>
                    <span className="text-xs text-slate-500">{gpu.vramGB}GB · {gpu.bandwidthGBs} GB/s</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

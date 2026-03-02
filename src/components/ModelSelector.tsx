"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Brain, Archive } from "lucide-react";
import { LLMModel } from "@/types";
import { getActiveModelsByFamily, getLegacyModelsByFamily } from "@/data/models";

interface Props {
  selected: LLMModel | null;
  onSelect: (model: LLMModel) => void;
}

export default function ModelSelector({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showLegacy, setShowLegacy] = useState(false);
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

  const activeGrouped = getActiveModelsByFamily();
  const legacyGrouped = getLegacyModelsByFamily();
  const q = search.toLowerCase();

  const renderGroup = (grouped: Record<string, LLMModel[]>, dimmed: boolean) => {
    return Object.entries(grouped).map(([family, modelList]) => {
      const filtered = modelList.filter((m) => m.name.toLowerCase().includes(q));
      if (filtered.length === 0) return null;
      return (
        <div key={family}>
          <div className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white/[0.02] ${dimmed ? "text-slate-600" : "text-slate-500"}`}>
            {family}
          </div>
          {filtered.map((model) => (
            <button
              key={model.id}
              onClick={() => { onSelect(model); setOpen(false); setSearch(""); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors flex justify-between items-center ${
                selected?.id === model.id
                  ? "bg-purple-500/15 text-purple-300"
                  : dimmed
                    ? "text-slate-500"
                    : "text-slate-300"
              }`}
            >
              <span>{model.name}</span>
              <span className={`text-xs ${dimmed ? "text-slate-600" : "text-slate-500"}`}>
                {model.totalParams}B{model.isMoE ? " MoE" : ""}
              </span>
            </button>
          ))}
        </div>
      );
    });
  };

  const hasLegacyResults = Object.values(legacyGrouped).some(
    (list) => list.some((m) => m.name.toLowerCase().includes(q))
  );

  return (
    <div ref={ref} className="relative">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
        <Brain className="w-4 h-4" /> Model
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors text-left"
      >
        <span className={selected ? "text-white" : "text-slate-500"}>
          {selected
            ? `${selected.name} (${selected.totalParams}B${selected.isMoE ? ` MoE, ${selected.activeParams}B active` : ""})`
            : "Select a model..."}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-h-80 overflow-auto rounded-xl bg-[#151520] border border-white/10 shadow-2xl">
          <div className="sticky top-0 bg-[#151520] p-2 border-b border-white/10 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          {/* Active Models */}
          {renderGroup(activeGrouped, false)}

          {/* Legacy Models Toggle */}
          {hasLegacyResults && (
            <>
              <button
                onClick={() => setShowLegacy(!showLegacy)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white/[0.03] hover:bg-white/[0.06] transition-colors border-t border-white/5"
              >
                <Archive className="w-3 h-3" />
                <span>Legacy Models (1+ year old)</span>
                <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${showLegacy ? "rotate-180" : ""}`} />
              </button>
              {showLegacy && renderGroup(legacyGrouped, true)}
            </>
          )}
        </div>
      )}
    </div>
  );
}

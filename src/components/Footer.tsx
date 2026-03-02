"use client";

import { Github, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>
              Estimates are theoretical and may differ from real-world performance.
              Based on memory bandwidth calculations and empirical scaling factors.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Data sources: GPU vendor specs, community benchmarks</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

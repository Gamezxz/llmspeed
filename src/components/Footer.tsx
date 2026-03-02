"use client";

import { Github, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              Estimates are theoretical and may differ from real-world performance.
              Based on memory bandwidth calculations and empirical scaling factors.
            </span>
          </div>
          <span className="shrink-0">Data sources: GPU vendor specs, community benchmarks</span>
        </div>
        <div className="flex justify-center">
          <a
            href="https://github.com/Gamezxz/llmspeed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

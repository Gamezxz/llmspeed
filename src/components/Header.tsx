"use client";

import { Zap, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center mb-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
          <Zap className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          LLM Speed Calculator
        </h1>
      </div>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
        Estimate token generation speed for any GPU + LLM combination.
        Compare hardware, check VRAM requirements, and find the best setup for your needs.
      </p>
      <a
        href="https://github.com/Gamezxz/llmspeed"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
      >
        <Github className="w-4 h-4" />
        <span>Built by <span className="font-semibold text-white">Gamezxz</span></span>
      </a>
    </header>
  );
}

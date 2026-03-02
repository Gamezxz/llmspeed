"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. In the realm of artificial intelligence, large language models have revolutionized how we interact with technology. These models can understand context, generate creative content, translate languages, and assist with complex reasoning tasks. The future of AI promises even more exciting developments as models become faster, smarter, and more efficient.";

interface Props {
  tps: number;
}

export default function SpeedPreview({ tps }: Props) {
  const [playing, setPlaying] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const effectiveTPS = Math.min(tps, 200);
  // Average ~4 chars per token
  const charsPerSecond = effectiveTPS * 4;
  const intervalMs = Math.max(10, 1000 / charsPerSecond);

  useEffect(() => {
    if (playing && charIndex < SAMPLE_TEXT.length) {
      const charsPerTick = Math.max(1, Math.floor(charsPerSecond / 100));
      intervalRef.current = setInterval(() => {
        setCharIndex((prev) => {
          const next = prev + charsPerTick;
          if (next >= SAMPLE_TEXT.length) {
            setPlaying(false);
            return SAMPLE_TEXT.length;
          }
          return next;
        });
      }, intervalMs);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, charIndex, charsPerSecond, intervalMs]);

  function handlePlay() {
    setCharIndex(0);
    setPlaying(true);
  }

  function handleReset() {
    setPlaying(false);
    setCharIndex(0);
  }

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-400">Streaming Preview</span>
        <div className="flex gap-2">
          <button
            onClick={handlePlay}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-medium hover:bg-blue-500/30 transition-colors border border-blue-500/30"
          >
            <Play className="w-3 h-3" /> Play
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs font-medium hover:bg-white/10 transition-colors border border-white/10"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>
      <div className="min-h-[80px] p-4 rounded-xl bg-black/30 border border-white/5 font-mono text-sm leading-relaxed text-slate-300">
        {SAMPLE_TEXT.slice(0, charIndex)}
        {charIndex < SAMPLE_TEXT.length && playing && (
          <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-0.5 align-middle" />
        )}
        {charIndex === 0 && !playing && (
          <span className="text-slate-600 italic">Press Play to see streaming at {tps.toFixed(1)} tokens/sec...</span>
        )}
      </div>
    </div>
  );
}

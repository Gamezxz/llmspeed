import { PerformanceRating } from "@/types";

export function getRatingColor(rating: PerformanceRating): string {
  switch (rating) {
    case "Unusable": return "#ef4444";
    case "Slow": return "#f97316";
    case "Good": return "#eab308";
    case "Excellent": return "#22c55e";
    case "Blazing": return "#3b82f6";
    case "Insane": return "#a855f7";
  }
}

export function getRatingBgClass(rating: PerformanceRating): string {
  switch (rating) {
    case "Unusable": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Slow": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "Good": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Excellent": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Blazing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Insane": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
  }
}

export function formatTPS(tps: number): string {
  if (tps >= 1000) return `${(tps / 1000).toFixed(1)}K`;
  if (tps >= 100) return tps.toFixed(0);
  if (tps >= 10) return tps.toFixed(1);
  return tps.toFixed(2);
}

export function formatVRAM(gb: number): string {
  if (gb >= 1000) return `${(gb / 1000).toFixed(1)} TB`;
  if (gb >= 100) return `${gb.toFixed(0)} GB`;
  return `${gb.toFixed(1)} GB`;
}

export function formatCost(cost: number): string {
  if (cost < 0.001) return `$${cost.toExponential(2)}`;
  if (cost < 1) return `$${cost.toFixed(4)}`;
  if (cost < 100) return `$${cost.toFixed(2)}`;
  return `$${cost.toFixed(0)}`;
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

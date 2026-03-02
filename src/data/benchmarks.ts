import { CloudBaseline } from "@/types";

export const cloudBaselines: CloudBaseline[] = [
  // ─── Cerebras (WSE chip, fastest inference) ────────────────
  { provider: "Cerebras", model: "Llama 3.1 8B", tps: 2100, costPer1MTokens: 0.10 },
  { provider: "Cerebras", model: "Llama 3.3 70B", tps: 2100, costPer1MTokens: 0.60 },
  { provider: "Cerebras", model: "Llama 3.1 405B", tps: 969, costPer1MTokens: 9.00 },
  { provider: "Cerebras", model: "Llama 4 Scout", tps: 2600, costPer1MTokens: 0.40 },
  { provider: "Cerebras", model: "Qwen 3 235B", tps: 600, costPer1MTokens: 0.90 },

  // ─── Groq (LPU ASIC) ──────────────────────────────────────
  { provider: "Groq", model: "Llama 3.1 8B", tps: 877, costPer1MTokens: 0.06 },
  { provider: "Groq", model: "Llama 3.3 70B", tps: 276, costPer1MTokens: 0.59 },
  { provider: "Groq", model: "Llama 3.3 70B (Spec Decode)", tps: 1665, costPer1MTokens: 0.59 },
  { provider: "Groq", model: "Mixtral 8x7B", tps: 480, costPer1MTokens: 0.24 },
  { provider: "Groq", model: "DeepSeek R1 Distill 70B", tps: 275, costPer1MTokens: 0.75 },

  // ─── SambaNova (RDU chip) ──────────────────────────────────
  { provider: "SambaNova", model: "Llama 3.1 8B", tps: 919, costPer1MTokens: 0.15 },
  { provider: "SambaNova", model: "Llama 3.1 70B", tps: 500, costPer1MTokens: 0.90 },
  { provider: "SambaNova", model: "Llama 3.1 405B", tps: 114, costPer1MTokens: 7.50 },
  { provider: "SambaNova", model: "DeepSeek R1 671B", tps: 250, costPer1MTokens: 6.00 },

  // ─── Together AI (GPU, optimized) ──────────────────────────
  { provider: "Together AI", model: "Llama 3.1 8B", tps: 180, costPer1MTokens: 0.10 },
  { provider: "Together AI", model: "Llama 3.1 70B", tps: 100, costPer1MTokens: 0.88 },
  { provider: "Together AI", model: "DeepSeek V3", tps: 60, costPer1MTokens: 1.25 },
  { provider: "Together AI", model: "DeepSeek R1", tps: 50, costPer1MTokens: 5.00 },

  // ─── Fireworks AI (GPU, FireAttention) ─────────────────────
  { provider: "Fireworks AI", model: "Llama 3.1 70B", tps: 90, costPer1MTokens: 0.90 },
  { provider: "Fireworks AI", model: "Gemma 3 27B", tps: 80, costPer1MTokens: 0.90 },
  { provider: "Fireworks AI", model: "DeepSeek R1", tps: 100, costPer1MTokens: 3.50 },

  // ─── DeepSeek (Own API) ────────────────────────────────────
  { provider: "DeepSeek", model: "DeepSeek V3.2", tps: 39, costPer1MTokens: 0.42 },
  { provider: "DeepSeek", model: "DeepSeek R1", tps: 18, costPer1MTokens: 2.19 },

  // ─── OpenAI ────────────────────────────────────────────────
  { provider: "OpenAI", model: "GPT-4o", tps: 157, costPer1MTokens: 10.00 },
  { provider: "OpenAI", model: "GPT-4o mini", tps: 100, costPer1MTokens: 0.60 },
  { provider: "OpenAI", model: "GPT-4.1", tps: 120, costPer1MTokens: 8.00 },
  { provider: "OpenAI", model: "GPT-4.1 nano", tps: 250, costPer1MTokens: 0.40 },

  // ─── Anthropic ─────────────────────────────────────────────
  { provider: "Anthropic", model: "Claude Haiku 4.5", tps: 121, costPer1MTokens: 5.00 },
  { provider: "Anthropic", model: "Claude Sonnet 4.6", tps: 58, costPer1MTokens: 15.00 },
  { provider: "Anthropic", model: "Claude Opus 4.6", tps: 35, costPer1MTokens: 25.00 },

  // ─── Google ────────────────────────────────────────────────
  { provider: "Google", model: "Gemini 2.5 Flash", tps: 248, costPer1MTokens: 0.60 },
  { provider: "Google", model: "Gemini 2.5 Flash-Lite", tps: 887, costPer1MTokens: 0.40 },
  { provider: "Google", model: "Gemini 2.5 Pro", tps: 80, costPer1MTokens: 10.00 },

  // ─── xAI ───────────────────────────────────────────────────
  { provider: "xAI", model: "Grok 4.1 Fast", tps: 150, costPer1MTokens: 0.50 },
  { provider: "xAI", model: "Grok 4", tps: 60, costPer1MTokens: 15.00 },
];

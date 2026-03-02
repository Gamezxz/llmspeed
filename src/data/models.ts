import { LLMModel } from "@/types";

export const models: LLMModel[] = [
  // ════════════════════════════════════════════════════════════════════
  //  ACTIVE MODELS — Popular on Ollama, updated within 1 year
  // ════════════════════════════════════════════════════════════════════

  // ─── Qwen (Alibaba) — Most popular family ─────────────────────────
  // Qwen 3.5 (updated yesterday, Hybrid DeltaNet+Attention)
  { id: "qwen-3.5-27b", name: "Qwen 3.5 27B", family: "Qwen", totalParams: 27, isMoE: false, architecture: "Hybrid Dense (DeltaNet+Attention)" },
  { id: "qwen-3.5-35b-a3b", name: "Qwen 3.5 35B-A3B", family: "Qwen", totalParams: 35, activeParams: 3, isMoE: true, expertCount: 256, architecture: "Hybrid MoE (DeltaNet+Attention)" },
  { id: "qwen-3.5-122b-a10b", name: "Qwen 3.5 122B-A10B", family: "Qwen", totalParams: 122, activeParams: 10, isMoE: true, expertCount: 256, architecture: "Hybrid MoE (DeltaNet+Attention)" },
  { id: "qwen-3.5-397b-a17b", name: "Qwen 3.5 397B-A17B", family: "Qwen", totalParams: 397, activeParams: 17, isMoE: true, expertCount: 512, architecture: "Hybrid MoE (DeltaNet+Attention)" },
  // Qwen 3 (22.3M pulls, 4 months ago)
  { id: "qwen-3-0.6b", name: "Qwen 3 0.6B", family: "Qwen", totalParams: 0.6, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-3-1.7b", name: "Qwen 3 1.7B", family: "Qwen", totalParams: 1.7, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-3-4b", name: "Qwen 3 4B", family: "Qwen", totalParams: 4, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-3-8b", name: "Qwen 3 8B", family: "Qwen", totalParams: 8, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-3-14b", name: "Qwen 3 14B", family: "Qwen", totalParams: 14, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-3-32b", name: "Qwen 3 32B", family: "Qwen", totalParams: 32, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-3-30b-a3b", name: "Qwen 3 30B-A3B", family: "Qwen", totalParams: 30.5, activeParams: 3.3, isMoE: true, expertCount: 128, architecture: "MoE Transformer" },
  { id: "qwen-3-235b-a22b", name: "Qwen 3 235B-A22B", family: "Qwen", totalParams: 235, activeParams: 22, isMoE: true, expertCount: 128, architecture: "MoE Transformer" },
  // Qwen3-Next (348.8K pulls, 2 months ago, Hybrid DeltaNet+Attention)
  { id: "qwen-3-next-80b-a3b", name: "Qwen3-Next 80B-A3B", family: "Qwen", totalParams: 80, activeParams: 3, isMoE: true, expertCount: 512, architecture: "Hybrid MoE (DeltaNet+Attention)" },
  // Qwen3 Coder (3.3M pulls, 5 months ago)
  { id: "qwen-3-coder-30b-a3b", name: "Qwen 3 Coder 30B-A3B", family: "Qwen", totalParams: 30.5, activeParams: 3.3, isMoE: true, expertCount: 128, architecture: "MoE Transformer" },
  { id: "qwen-3-coder-480b", name: "Qwen 3 Coder 480B-A35B", family: "Qwen", totalParams: 480, activeParams: 35, isMoE: true, expertCount: 160, architecture: "MoE Transformer" },
  // Qwen 2.5 Coder (11.4M pulls, 9 months ago)
  { id: "qwen-2.5-coder-0.5b", name: "Qwen 2.5 Coder 0.5B", family: "Qwen", totalParams: 0.5, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-2.5-coder-1.5b", name: "Qwen 2.5 Coder 1.5B", family: "Qwen", totalParams: 1.5, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-2.5-coder-3b", name: "Qwen 2.5 Coder 3B", family: "Qwen", totalParams: 3, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-2.5-coder-7b", name: "Qwen 2.5 Coder 7B", family: "Qwen", totalParams: 7, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-2.5-coder-14b", name: "Qwen 2.5 Coder 14B", family: "Qwen", totalParams: 14, isMoE: false, architecture: "Dense Transformer" },
  { id: "qwen-2.5-coder-32b", name: "Qwen 2.5 Coder 32B", family: "Qwen", totalParams: 32, isMoE: false, architecture: "Dense Transformer" },
  // QwQ (2.1M pulls, 11 months ago)
  { id: "qwq-32b", name: "QwQ 32B", family: "Qwen", totalParams: 32.5, isMoE: false, architecture: "Dense Transformer (Reasoning)" },

  // ─── DeepSeek ─────────────────────────────────────────────────────
  // DeepSeek R1 (78.8M pulls, 8 months ago)
  { id: "deepseek-r1-distill-1.5b", name: "DeepSeek R1 Distill 1.5B", family: "DeepSeek", totalParams: 1.5, isMoE: false, architecture: "Dense Transformer" },
  { id: "deepseek-r1-distill-7b", name: "DeepSeek R1 Distill 7B", family: "DeepSeek", totalParams: 7, isMoE: false, architecture: "Dense Transformer" },
  { id: "deepseek-r1-distill-8b", name: "DeepSeek R1 Distill 8B", family: "DeepSeek", totalParams: 8, isMoE: false, architecture: "Dense Transformer" },
  { id: "deepseek-r1-distill-14b", name: "DeepSeek R1 Distill 14B", family: "DeepSeek", totalParams: 14, isMoE: false, architecture: "Dense Transformer" },
  { id: "deepseek-r1-distill-32b", name: "DeepSeek R1 Distill 32B", family: "DeepSeek", totalParams: 32, isMoE: false, architecture: "Dense Transformer" },
  { id: "deepseek-r1-distill-70b", name: "DeepSeek R1 Distill 70B", family: "DeepSeek", totalParams: 70, isMoE: false, architecture: "Dense Transformer" },
  { id: "deepseek-r1-671b", name: "DeepSeek R1 671B", family: "DeepSeek", totalParams: 671, activeParams: 37, isMoE: true, expertCount: 256, architecture: "MoE Transformer (MLA)" },
  // DeepSeek V3.1 / V3.2 (5 months / 2 months ago)
  { id: "deepseek-v3.1", name: "DeepSeek V3.1", family: "DeepSeek", totalParams: 671, activeParams: 37, isMoE: true, expertCount: 256, architecture: "MoE Transformer (MLA)" },
  { id: "deepseek-v3.2", name: "DeepSeek V3.2", family: "DeepSeek", totalParams: 685, activeParams: 37, isMoE: true, expertCount: 256, architecture: "MoE Transformer (MLA+DSA)" },

  // ─── Llama (Meta) ─────────────────────────────────────────────────
  // Llama 4 (1.2M pulls, 8 months ago)
  { id: "llama-4-scout", name: "Llama 4 Scout", family: "Llama", totalParams: 109, activeParams: 17, isMoE: true, expertCount: 16, architecture: "MoE Transformer (iRoPE)" },
  { id: "llama-4-maverick", name: "Llama 4 Maverick", family: "Llama", totalParams: 400, activeParams: 17, isMoE: true, expertCount: 128, architecture: "MoE Transformer (iRoPE)" },

  // ─── Gemma (Google) ───────────────────────────────────────────────
  // Gemma 3 (32.3M pulls, 2 months ago)
  { id: "gemma-3-1b", name: "Gemma 3 1B", family: "Gemma", totalParams: 1, isMoE: false, architecture: "Dense Transformer" },
  { id: "gemma-3-4b", name: "Gemma 3 4B", family: "Gemma", totalParams: 4, isMoE: false, architecture: "Dense Transformer" },
  { id: "gemma-3-12b", name: "Gemma 3 12B", family: "Gemma", totalParams: 12, isMoE: false, architecture: "Dense Transformer" },
  { id: "gemma-3-27b", name: "Gemma 3 27B", family: "Gemma", totalParams: 27, isMoE: false, architecture: "Dense Transformer" },
  // Gemma 3N (1.3M pulls, 8 months ago, MatFormer nested architecture)
  { id: "gemma-3n-e2b", name: "Gemma 3N E2B", family: "Gemma", totalParams: 5, activeParams: 2, isMoE: false, architecture: "MatFormer (Nested Dense)" },
  { id: "gemma-3n-e4b", name: "Gemma 3N E4B", family: "Gemma", totalParams: 8, activeParams: 4, isMoE: false, architecture: "MatFormer (Nested Dense)" },

  // ─── GPT-OSS (OpenAI) ─────────────────────────────────────────────
  // (7.2M pulls, 4 months ago, first open-weight from OpenAI)
  { id: "gpt-oss-20b", name: "GPT-OSS 20B-A3.6B", family: "GPT-OSS", totalParams: 21, activeParams: 3.6, isMoE: true, expertCount: 32, architecture: "MoE Transformer" },
  { id: "gpt-oss-120b", name: "GPT-OSS 120B-A5.1B", family: "GPT-OSS", totalParams: 117, activeParams: 5.1, isMoE: true, expertCount: 128, architecture: "MoE Transformer" },

  // ─── Phi (Microsoft) ──────────────────────────────────────────────
  // Phi-4 (7.2M pulls) + Reasoning variants (10 months ago)
  { id: "phi-4-mini", name: "Phi-4 Mini 3.8B", family: "Phi", totalParams: 3.8, isMoE: false, architecture: "Dense Transformer" },
  { id: "phi-4", name: "Phi-4 14B", family: "Phi", totalParams: 14, isMoE: false, architecture: "Dense Transformer" },
  { id: "phi-4-reasoning", name: "Phi-4 Reasoning 14B", family: "Phi", totalParams: 14, isMoE: false, architecture: "Dense Transformer (Reasoning)" },

  // ─── Mistral ──────────────────────────────────────────────────────
  // Mistral 7B (25.8M pulls, 7 months ago)
  { id: "mistral-7b", name: "Mistral 7B", family: "Mistral", totalParams: 7.3, isMoE: false, architecture: "Dense Transformer (SWA)" },
  // Mistral Nemo (3.4M pulls, 7 months ago)
  { id: "mistral-nemo-12b", name: "Mistral Nemo 12B", family: "Mistral", totalParams: 12, isMoE: false, architecture: "Dense Transformer" },
  // Mistral Small 3.1 / 3.2 (10 months / 8 months ago)
  { id: "mistral-small-3.1", name: "Mistral Small 3.1 24B", family: "Mistral", totalParams: 24, isMoE: false, architecture: "Dense Transformer" },
  { id: "mistral-small-3.2", name: "Mistral Small 3.2 24B", family: "Mistral", totalParams: 24, isMoE: false, architecture: "Dense Transformer (Multimodal)" },
  // Magistral (1.1M pulls, 8 months ago)
  { id: "magistral-small", name: "Magistral Small 24B", family: "Mistral", totalParams: 24, isMoE: false, architecture: "Dense Transformer (Reasoning)" },
  // Ministral 3 (507.1K pulls, 2 months ago)
  { id: "ministral-3-3b", name: "Ministral 3 3B", family: "Mistral", totalParams: 3, isMoE: false, architecture: "Dense Transformer" },
  { id: "ministral-3-8b", name: "Ministral 3 8B", family: "Mistral", totalParams: 8, isMoE: false, architecture: "Dense Transformer" },
  { id: "ministral-3-14b", name: "Ministral 3 14B", family: "Mistral", totalParams: 14, isMoE: false, architecture: "Dense Transformer" },
  // Devstral (8 months / 2 months ago)
  { id: "devstral-small-2", name: "Devstral Small 2 24B", family: "Mistral", totalParams: 24, isMoE: false, architecture: "Dense Transformer" },
  { id: "devstral-2", name: "Devstral 2 123B", family: "Mistral", totalParams: 123, isMoE: false, architecture: "Dense Transformer" },
  // Mistral Large 3 (2 months ago)
  { id: "mistral-large-3", name: "Mistral Large 3", family: "Mistral", totalParams: 675, activeParams: 41, isMoE: true, architecture: "MoE Transformer" },

  // ─── GLM (Zhipu AI) ───────────────────────────────────────────────
  // GLM-4.6 (73.5K pulls, 4 months ago)
  { id: "glm-4.6", name: "GLM-4.6 355B-A32B", family: "GLM", totalParams: 355, activeParams: 32, isMoE: true, expertCount: 256, architecture: "MoE Transformer" },
  // GLM-4.7 (55.3K pulls, 2 months ago)
  { id: "glm-4.7", name: "GLM-4.7 355B-A32B", family: "GLM", totalParams: 355, activeParams: 32, isMoE: true, expertCount: 256, architecture: "MoE Transformer" },
  // GLM-4.7 Flash (332.9K pulls, 1 month ago)
  { id: "glm-4.7-flash", name: "GLM-4.7 Flash 30B-A3B", family: "GLM", totalParams: 30, activeParams: 3, isMoE: true, expertCount: 256, architecture: "MoE Transformer" },
  // GLM-5 (66.9K pulls, 2 weeks ago)
  { id: "glm-5", name: "GLM-5 745B-A44B", family: "GLM", totalParams: 745, activeParams: 44, isMoE: true, expertCount: 256, architecture: "MoE Transformer (MLA)" },

  // ─── LFM (Liquid AI) ──────────────────────────────────────────────
  // LFM2 (1.7M pulls, 6 days ago, Hybrid conv+attention+MoE)
  { id: "lfm2-24b", name: "LFM2 24B-A2B", family: "LFM", totalParams: 24, activeParams: 2.3, isMoE: true, expertCount: 64, architecture: "Hybrid MoE (Conv+Attention)" },
  // LFM2.5 (814.7K pulls, 1 month ago, Dense hybrid conv+attention)
  { id: "lfm2.5-1.2b", name: "LFM2.5 1.2B", family: "LFM", totalParams: 1.2, isMoE: false, architecture: "Hybrid Dense (Conv+Attention)" },

  // ─── Granite (IBM) ────────────────────────────────────────────────
  // Granite 3.3 (910.3K pulls, 10 months ago)
  { id: "granite-3.3-2b", name: "Granite 3.3 2B", family: "Granite", totalParams: 2, isMoE: false, architecture: "Dense Transformer" },
  { id: "granite-3.3-8b", name: "Granite 3.3 8B", family: "Granite", totalParams: 8, isMoE: false, architecture: "Dense Transformer" },
  // Granite 4 (748.1K pulls, 4 months ago, Hybrid Mamba-Transformer)
  { id: "granite-4-1b", name: "Granite 4 1B", family: "Granite", totalParams: 1.5, isMoE: false, architecture: "Hybrid Dense (Mamba-2+Attention)" },
  { id: "granite-4-3b", name: "Granite 4 3B", family: "Granite", totalParams: 3, isMoE: false, architecture: "Hybrid Dense (Mamba-2+Attention)" },
  { id: "granite-4-tiny-7b", name: "Granite 4 Tiny 7B-A1B", family: "Granite", totalParams: 7, activeParams: 1, isMoE: true, architecture: "Hybrid Mamba-Transformer MoE" },
  { id: "granite-4-small-32b", name: "Granite 4 Small 32B-A9B", family: "Granite", totalParams: 32, activeParams: 9, isMoE: true, architecture: "Hybrid Mamba-Transformer MoE" },

  // ─── ExaOne (LG AI Research) ──────────────────────────────────────
  // ExaOne 3.5 (271.5K pulls, bilingual EN/KR)
  { id: "exaone-3.5-2.4b", name: "ExaOne 3.5 2.4B", family: "ExaOne", totalParams: 2.4, isMoE: false, architecture: "Dense Transformer" },
  { id: "exaone-3.5-7.8b", name: "ExaOne 3.5 7.8B", family: "ExaOne", totalParams: 7.8, isMoE: false, architecture: "Dense Transformer" },
  { id: "exaone-3.5-32b", name: "ExaOne 3.5 32B", family: "ExaOne", totalParams: 32, isMoE: false, architecture: "Dense Transformer" },
  // ExaOne Deep (506K pulls, 11 months ago, reasoning-enhanced)
  { id: "exaone-deep-2.4b", name: "ExaOne Deep 2.4B", family: "ExaOne", totalParams: 2.4, isMoE: false, architecture: "Dense Transformer (Reasoning)" },
  { id: "exaone-deep-7.8b", name: "ExaOne Deep 7.8B", family: "ExaOne", totalParams: 7.8, isMoE: false, architecture: "Dense Transformer (Reasoning)" },
  { id: "exaone-deep-32b", name: "ExaOne Deep 32B", family: "ExaOne", totalParams: 32, isMoE: false, architecture: "Dense Transformer (Reasoning)" },

  // ─── MiniMax ──────────────────────────────────────────────────────
  // MiniMax M2 (66.5K pulls, 4 months ago)
  { id: "minimax-m2", name: "MiniMax M2 230B-A10B", family: "MiniMax", totalParams: 230, activeParams: 10, isMoE: true, expertCount: 32, architecture: "MoE Transformer" },
  // MiniMax M2.5 (65.1K pulls, 2 weeks ago)
  { id: "minimax-m2.5", name: "MiniMax M2.5 230B-A10B", family: "MiniMax", totalParams: 230, activeParams: 10, isMoE: true, expertCount: 32, architecture: "MoE Transformer" },

  // ─── OLMo (AI2) ──────────────────────────────────────────────────
  // OLMo 3 (171K pulls, 2 months ago, fully open)
  { id: "olmo-3-7b", name: "OLMo 3 7B", family: "OLMo", totalParams: 7, isMoE: false, architecture: "Dense Transformer" },
  { id: "olmo-3-32b", name: "OLMo 3 32B", family: "OLMo", totalParams: 32, isMoE: false, architecture: "Dense Transformer" },

  // ─── Command (Cohere) ─────────────────────────────────────────────
  // Command A (133.4K pulls, 11 months ago)
  { id: "command-a-111b", name: "Command A 111B", family: "Command", totalParams: 111, isMoE: false, architecture: "Dense Transformer" },

  // ─── Kimi (Moonshot) ──────────────────────────────────────────────
  // Kimi K2 (41.1K pulls, 5 months ago)
  { id: "kimi-k2", name: "Kimi K2", family: "Kimi", totalParams: 1000, activeParams: 32, isMoE: true, expertCount: 384, architecture: "MoE Transformer" },
  // Kimi K2.5 (103.6K pulls, 1 month ago)
  { id: "kimi-k2.5", name: "Kimi K2.5", family: "Kimi", totalParams: 1000, activeParams: 32, isMoE: true, expertCount: 384, architecture: "MoE Transformer (Multimodal)" },

  // ─── Nemotron (NVIDIA) ────────────────────────────────────────────
  // Nemotron 3 Nano (186.5K pulls, 2 months ago)
  { id: "nemotron-3-nano-30b", name: "Nemotron 3 Nano 30B-A3B", family: "Nemotron", totalParams: 30, activeParams: 3.5, isMoE: true, expertCount: 128, architecture: "Hybrid Mamba-Transformer MoE" },

  // ─── RNJ (Essential AI) ──────────────────────────────────────────
  // RNJ-1 (330.7K pulls, 2 months ago, by Ashish Vaswani's startup)
  { id: "rnj-1-8b", name: "RNJ-1 8B", family: "RNJ", totalParams: 8, isMoE: false, architecture: "Dense Transformer" },

  // ─── ERNIE (Baidu) ────────────────────────────────────────────────
  { id: "ernie-4.5-21b-a3b", name: "ERNIE 4.5 21B-A3B", family: "ERNIE", totalParams: 21, activeParams: 3, isMoE: true, architecture: "MoE Transformer" },
  { id: "ernie-4.5-300b-a47b", name: "ERNIE 4.5 300B-A47B", family: "ERNIE", totalParams: 300, activeParams: 47, isMoE: true, architecture: "MoE Transformer" },

  // ─── InternLM (Shanghai AI Lab) ──────────────────────────────────
  { id: "internlm-3-8b", name: "InternLM 3 8B", family: "InternLM", totalParams: 8, isMoE: false, architecture: "Dense Transformer" },

  // ════════════════════════════════════════════════════════════════════
  //  LEGACY MODELS — Last updated >1 year on Ollama (still usable)
  // ════════════════════════════════════════════════════════════════════

  // ─── Llama (Meta) ─────────────────────────────────────────────────
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", family: "Llama", totalParams: 70, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.2-1b", name: "Llama 3.2 1B", family: "Llama", totalParams: 1, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.2-3b", name: "Llama 3.2 3B", family: "Llama", totalParams: 3, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.2-11b", name: "Llama 3.2 11B Vision", family: "Llama", totalParams: 11, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.2-90b", name: "Llama 3.2 90B Vision", family: "Llama", totalParams: 90, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.1-8b", name: "Llama 3.1 8B", family: "Llama", totalParams: 8, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.1-70b", name: "Llama 3.1 70B", family: "Llama", totalParams: 70, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3.1-405b", name: "Llama 3.1 405B", family: "Llama", totalParams: 405, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3-8b", name: "Llama 3 8B", family: "Llama", totalParams: 8, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-3-70b", name: "Llama 3 70B", family: "Llama", totalParams: 70, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-2-7b", name: "Llama 2 7B", family: "Llama", totalParams: 7, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-2-13b", name: "Llama 2 13B", family: "Llama", totalParams: 13, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "llama-2-70b", name: "Llama 2 70B", family: "Llama", totalParams: 70, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Qwen (Alibaba) ──────────────────────────────────────────────
  { id: "qwen-2.5-0.5b", name: "Qwen 2.5 0.5B", family: "Qwen", totalParams: 0.5, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "qwen-2.5-1.5b", name: "Qwen 2.5 1.5B", family: "Qwen", totalParams: 1.5, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "qwen-2.5-3b", name: "Qwen 2.5 3B", family: "Qwen", totalParams: 3, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "qwen-2.5-7b", name: "Qwen 2.5 7B", family: "Qwen", totalParams: 7, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "qwen-2.5-14b", name: "Qwen 2.5 14B", family: "Qwen", totalParams: 14, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "qwen-2.5-32b", name: "Qwen 2.5 32B", family: "Qwen", totalParams: 32, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "qwen-2.5-72b", name: "Qwen 2.5 72B", family: "Qwen", totalParams: 72, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Gemma (Google) ──────────────────────────────────────────────
  { id: "gemma-2-2b", name: "Gemma 2 2B", family: "Gemma", totalParams: 2, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "gemma-2-9b", name: "Gemma 2 9B", family: "Gemma", totalParams: 9, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "gemma-2-27b", name: "Gemma 2 27B", family: "Gemma", totalParams: 27, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Mixtral (Mistral) ───────────────────────────────────────────
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", family: "Mixtral", totalParams: 45, activeParams: 13, isMoE: true, expertCount: 8, architecture: "MoE Transformer", isLegacy: true },
  { id: "mixtral-8x22b", name: "Mixtral 8x22B", family: "Mixtral", totalParams: 141, activeParams: 39, isMoE: true, expertCount: 8, architecture: "MoE Transformer", isLegacy: true },

  // ─── DeepSeek (original V3) ──────────────────────────────────────
  { id: "deepseek-v3", name: "DeepSeek V3", family: "DeepSeek", totalParams: 671, activeParams: 37, isMoE: true, expertCount: 256, architecture: "MoE Transformer (MLA)", isLegacy: true },

  // ─── OLMo (AI2) ──────────────────────────────────────────────────
  { id: "olmo-2-7b", name: "OLMo 2 7B", family: "OLMo", totalParams: 7, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "olmo-2-13b", name: "OLMo 2 13B", family: "OLMo", totalParams: 13, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Yi (01.AI) ──────────────────────────────────────────────────
  { id: "yi-1.5-6b", name: "Yi 1.5 6B", family: "Yi", totalParams: 6, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "yi-1.5-9b", name: "Yi 1.5 9B", family: "Yi", totalParams: 9, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "yi-1.5-34b", name: "Yi 1.5 34B", family: "Yi", totalParams: 34, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Falcon (TII) ────────────────────────────────────────────────
  { id: "falcon-3-1b", name: "Falcon 3 1B", family: "Falcon", totalParams: 1, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "falcon-3-3b", name: "Falcon 3 3B", family: "Falcon", totalParams: 3, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "falcon-3-7b", name: "Falcon 3 7B", family: "Falcon", totalParams: 7, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "falcon-3-10b", name: "Falcon 3 10B", family: "Falcon", totalParams: 10, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Command R (Cohere) ──────────────────────────────────────────
  { id: "command-r-35b", name: "Command R 35B", family: "Command", totalParams: 35, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "command-r-plus-104b", name: "Command R+ 104B", family: "Command", totalParams: 104, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── GLM (Zhipu AI) ──────────────────────────────────────────────
  { id: "glm-4-9b", name: "GLM-4 9B", family: "GLM", totalParams: 9, isMoE: false, architecture: "Dense Transformer", isLegacy: true },
  { id: "glm-4-32b", name: "GLM-4 32B", family: "GLM", totalParams: 32, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Nemotron (NVIDIA) ───────────────────────────────────────────
  { id: "nemotron-4-340b", name: "Nemotron-4 340B", family: "Nemotron", totalParams: 340, isMoE: false, architecture: "Dense Transformer", isLegacy: true },

  // ─── Grok (xAI) ──────────────────────────────────────────────────
  { id: "grok-1", name: "Grok-1 314B", family: "Grok", totalParams: 314, activeParams: 79, isMoE: true, architecture: "MoE Transformer", isLegacy: true },
];

export function getModelsByFamily(): Record<string, LLMModel[]> {
  const grouped: Record<string, LLMModel[]> = {};
  for (const model of models) {
    if (!grouped[model.family]) grouped[model.family] = [];
    grouped[model.family].push(model);
  }
  return grouped;
}

export function getActiveModelsByFamily(): Record<string, LLMModel[]> {
  const grouped: Record<string, LLMModel[]> = {};
  for (const model of models) {
    if (model.isLegacy) continue;
    if (!grouped[model.family]) grouped[model.family] = [];
    grouped[model.family].push(model);
  }
  return grouped;
}

export function getLegacyModelsByFamily(): Record<string, LLMModel[]> {
  const grouped: Record<string, LLMModel[]> = {};
  for (const model of models) {
    if (!model.isLegacy) continue;
    if (!grouped[model.family]) grouped[model.family] = [];
    grouped[model.family].push(model);
  }
  return grouped;
}

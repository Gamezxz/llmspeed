import { Quantization } from "@/types";

export const quantizations: Quantization[] = [
  {
    id: "q2_k",
    name: "Q2_K",
    bitsPerWeight: 2.6,
    description: "Extreme compression, significant quality loss",
  },
  {
    id: "q3_k_m",
    name: "Q3_K_M",
    bitsPerWeight: 3.3,
    description: "Heavy compression, noticeable quality loss",
  },
  {
    id: "q4_k_m",
    name: "Q4_K_M",
    bitsPerWeight: 4.8,
    description: "Good balance of size and quality",
  },
  {
    id: "q5_k_m",
    name: "Q5_K_M",
    bitsPerWeight: 5.7,
    description: "High quality, moderate compression",
  },
  {
    id: "q6_k",
    name: "Q6_K",
    bitsPerWeight: 6.6,
    description: "Near-lossless quality",
  },
  {
    id: "q8_0",
    name: "Q8_0",
    bitsPerWeight: 8.5,
    description: "Virtually lossless",
  },
  {
    id: "fp16",
    name: "FP16",
    bitsPerWeight: 16.0,
    description: "Full precision, no quantization",
  },
];

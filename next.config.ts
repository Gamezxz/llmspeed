import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/llmspeed',
  images: { unoptimized: true },
};

export default nextConfig;

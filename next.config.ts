import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/meirixundianxitong',
  assetPrefix: '/meirixundianxitong',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

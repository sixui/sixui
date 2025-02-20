import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@sixui/core'],
  },
};

export default nextConfig;

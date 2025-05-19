import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://3.39.54.119:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;

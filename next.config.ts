import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: ["mogakzone-001.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;

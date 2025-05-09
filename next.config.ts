import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3.5mb",
    },
  },
  images: {
    domains: ["localhost", "192.168.1.11", "api-prod.olmatuinsa.online"],
  },
  /* config options here */
};

export default nextConfig;

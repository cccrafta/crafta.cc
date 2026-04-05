import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
};

export default nextConfig;

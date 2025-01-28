import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/chat",
        destination: "http://backend:8000/api/chat", // Proxy to the backend container
      },
    ];
  },
};

export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.18"],

  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

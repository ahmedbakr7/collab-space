import type { NextConfig } from "next";

const nextConfig: NextConfig = { /* config options here */
    reactStrictMode: true,
    poweredByHeader: false,
    reactCompiler: true,
    // Enable gzip compression for reduced file sizes
    compress: false,
    // optimize for docker deployment
    output: "standalone",
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    cacheComponents: true,
    // Increase body size limit for Server Actions to support larger image uploads
    // Default is 1MB, increased to 5MB to align with 1MB file validation in server actions
    experimental: {
        serverActions: {
            bodySizeLimit: "1mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    // cacheComponents: true,
};

export default nextConfig;

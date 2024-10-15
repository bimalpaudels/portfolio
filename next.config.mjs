/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    minimumCacheTTL: 300,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

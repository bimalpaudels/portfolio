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
      {
        protocol: "https",
        hostname: "**.notion.so",
        port: "",
      },
      {
        protocol: "https",
        hostname: "notion.so",
        port: "",
      },
    ],
  },
};

export default nextConfig;

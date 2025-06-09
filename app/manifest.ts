import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bimal Paudel - Developer & Learner",
    short_name: "Bimal Paudel",
    description:
      "Full-stack developer passionate about building modern web applications. Sharing insights on development, technology, and continuous learning.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["developer", "blog", "technology", "programming"],
    lang: "en",
    orientation: "portrait-primary",
  };
}

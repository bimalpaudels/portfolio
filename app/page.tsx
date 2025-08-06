import { HomeNavigation } from "@/components";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading font-semibold pt-12 text-gray-900 dark:text-gray-100">
        Bimal Paudel
      </h2>

      <div className="article">
        <p className="text-gray-900 dark:text-gray-100">
          I&apos;m a full-stack developer with over three years of experience
          building scalable web applications—based in Berlin, originally from
          Nepal.
        </p>
      </div>

      {/* Horizontal Navigation and Social Links Sections */}
      <HomeNavigation />
    </div>
  );
}

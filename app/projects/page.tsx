import { Header } from "@/components";
import { fetchProjectsDatabaseContent } from "@/lib";
import { ProjectsListRenderer } from "@/components";

export const metadata = {
  title: "Projects",
  alternates: {
    canonical: "/projects",
  },
};

export const revalidate = 300;

export default async function Projects() {
  const projects = await fetchProjectsDatabaseContent();

  return (
    <div className="animate-fade-in">
      <Header />

      <div className="article">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A collection of projects I&apos;ve built, ranging from web
          applications to open-source tools.
        </p>
      </div>

      <ProjectsListRenderer pages={projects} />
    </div>
  );
}

import { siGithub } from "simple-icons";

interface Project {
  title: string;
  description: string;
  period: string;
  url: string;
  github_url?: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div className="space-y-5">
      {projects.map((project, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-start gap-2"
        >
          <div className="sm:w-1/3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {project.title}
            </a>
          </div>
          <div className="sm:w-2/3">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
            <div className="flex items-center gap-3 mt-1">
              {project.github_url && project.github_url.length > 0 && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24">
                    <path d={siGithub.path} fill="currentColor" />
                  </svg>
                  GitHub
                </a>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {project.period}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

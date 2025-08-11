import Link from "next/link";
import { FileUser, Linkedin } from "lucide-react";
import { siGmail, siGithub } from "simple-icons";
import { personalProjects, learnMoreSections } from "@/data/projectsData";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <h4 className="font-heading font-semibold pt-12 text-gray-900 dark:text-gray-100">
        Bimal Paudel
      </h4>

      <div className="mb-2">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          I&apos;m a full-stack developer with over three years of experience
          building scalable web applications—based in Berlin, originally from
          Nepal.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:ibimalp@gmail.com"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d={siGmail.path} fill="currentColor" />
            </svg>
            Email
          </a>
          <a
            href="https://github.com/bimalpaudels"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d={siGithub.path} fill="currentColor" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bimalpaudel/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <Linkedin className="w-4 h-4" />
            </svg>
            LinkedIn
          </a>
          <Link
            href="/about"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <FileUser className="w-4 h-4" />
            About
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-gray-100 mb-16">
          Personal Projects
        </h3>

        <div className="space-y-4">
          {personalProjects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start gap-6"
            >
              <div className="sm:w-1/3">
                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                  {project.title}
                </h4>
              </div>
              <div className="sm:w-2/3">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                  {project.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-gray-100 mb-16">
          Learn More
        </h3>

        <div className="space-y-4">
          {learnMoreSections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start gap-6"
            >
              <div className="sm:w-1/3">
                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                  {section.title}
                </h4>
              </div>
              <div className="sm:w-2/3">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 mb-44">
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          Thank you for visiting.
        </p>
      </div>
    </div>
  );
}

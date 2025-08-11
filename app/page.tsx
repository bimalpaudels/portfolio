import { Mail, Github, Linkedin, FileUser } from "lucide-react";

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
            <Mail className="w-4 h-4" />
            Email
          </a>
          <a
            href="https://github.com/bimalpaudels"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bimalpaudel/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 transition-colors duration-200"
          >
            <FileUser className="w-4 h-4" />
            Resume
          </a>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-gray-100 mb-16">
          Personal Projects
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                Portfolio Website
              </h4>
            </div>
            <div className="sm:w-2/3 space-y-0.5">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                A modern, responsive portfolio built with Next.js and Tailwind
                CSS, showcasing my work and experience.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                2024–Now
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                E-commerce Platform
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Full-stack e-commerce solution with React, Node.js, and
                PostgreSQL, featuring user authentication and payment
                processing.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                2023–2024
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                Task Management App
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                A collaborative task management application built with React and
                Firebase, supporting real-time updates and team collaboration.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                2022–2023
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                Weather Dashboard
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Interactive weather application using OpenWeatherMap API, built
                with vanilla JavaScript and CSS Grid for responsive design.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                2022
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                Blog Platform
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                A content management system for blogging with markdown support,
                built with Express.js and MongoDB.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                2021–2022
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                Recipe Finder
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Recipe search application using the Spoonacular API, featuring
                ingredient-based search and recipe recommendations.
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                2021
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-gray-100 mb-16">
          Learn More
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                About Me
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn more about my background, experience, and what drives me
                as a developer.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="sm:w-1/3">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500">
                Tech Stack
              </h4>
            </div>
            <div className="sm:w-2/3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Explore the technologies, frameworks, and tools I use to build
                modern web applications.
              </p>
            </div>
          </div>
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

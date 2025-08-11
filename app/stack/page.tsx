"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Code,
  Brain,
  Server,
  Monitor,
  Database,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Stack() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSections, setExpandedSections] = useState<string[]>(["tldr"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const stackSections = [
    {
      key: "ai",
      title: "AI & Machine Learning",
      icon: <Brain className="h-5 w-5" />,
      content: (
        <div className="space-y-3 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            I work on deep learning models with PyTorch and work extensively
            with the Hugging Face Transformers ecosystem for NLP tasks and
            projects.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            I use Cursor as my LLM powered IDE to mainly take advantage of its
            Tab feature but also with designing frontend components, debugging
            and few other things. Before Cursor, I had integrated v0 to my
            workflow and I thought that was the best approach. Now I can&apos;t
            even imagine moving back and forth from browser to IDE.
          </p>
        </div>
      ),
    },
    {
      key: "backend",
      title: "Backend & APIs",
      icon: <Server className="h-5 w-5" />,
      content: (
        <div className="space-y-3 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            I primarily build backend systems with Django and FastAPI, choosing
            between them based on project complexity and performance
            requirements. For Node.js ecosystems, I work with Express.js when a
            particular project requires it.
          </p>
        </div>
      ),
    },
    {
      key: "frontend",
      title: "Frontend Development",
      icon: <Monitor className="h-5 w-5" />,
      content: (
        <div className="space-y-3 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            My go-to stack is Next.js with TypeScript and Tailwind CSS.
            I&apos;ve shipped everything from complex dashboards to simple web
            applications such as this portfolio using this combination.
          </p>
        </div>
      ),
    },
    {
      key: "data",
      title: "Data & Infrastructure",
      icon: <Database className="h-5 w-5" />,
      content: (
        <div className="space-y-3 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            I primarily use PostgreSQL for relational data, though I have
            extensive MySQL experience. Supabase has become my default choice
            for new projects—its real-time capabilities and especially
            integrated auth have streamlined my development workflow
            significantly. Redis is the obvious choice for caching layer.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            My deployment strategy revolves around Docker for containerization
            and that&apos;s something I have experience with professionally,
            where I have used it with multiple full-stack applications alongside
            Compose. I&apos;ve also learnt and used Kubernetes for orchestration
            for my personal projects hosted locally.
          </p>
        </div>
      ),
    },
    {
      key: "learning",
      title: "Current Learning & Evolution",
      icon: <BookOpen className="h-5 w-5" />,
      content: (
        <div className="space-y-3 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            I&apos;m constantly trying to evolve my stack based on real-world
            challenges and changing technical landscapes. For example, I am
            integrating the power of LLMs on multiple personal projects to
            improve and keep up with the change. My goal is always finding the
            right tool for each specific problem rather than forcing every
            solution into familiar patterns.
          </p>
        </div>
      ),
    },
  ];

  const currentlyExploring = [
    {
      name: "Rust",
      description: "Systems programming and WebAssembly",
      color: "bg-blue-500",
    },
    {
      name: "Three.js",
      description: "3D web experiences and WebGL",
      color: "bg-green-500",
    },
    {
      name: "AI Integration",
      description: "LLMs and AI-powered applications",
      color: "bg-purple-500",
    },
    {
      name: "Edge Computing",
      description: "Distributed systems and performance",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-darkmode text-gray-900 dark:text-custom_dark relative overflow-hidden">
      <div
        className="fixed inset-0 opacity-20 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1), transparent 80%)`,
        }}
      />

      <div className="container max-w-[65ch] mx-auto px-4 py-16 relative z-10">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-custom_dark transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-custom_dark">
                Tech Stack
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                My current technology stack and development philosophy
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Section - Outside card, styled like landing page */}
        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            I architect solutions primarily in Python, leveraging its
            versatility across backend development, AI research, and data
            analytics. I also have experience working with
            Typescript/Javascript. My approach centers on building scalable
            systems that can evolve—I try to prioritize clean, maintainable code
            that performs well technically.
          </p>
        </div>

        {/* TLDR Section - Designed like Hobbies without colors, opened by default */}
        <div className="mb-8 rounded-lg overflow-hidden transition-all duration-200 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleSection("tldr")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
          >
            <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
              TLDR
            </h3>
            {expandedSections.includes("tldr") ? (
              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          {expandedSections.includes("tldr") && (
            <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="pt-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Python, Django, FastAPI, Next.js, TypeScript, Tailwind, PostgreSQL,
                  Supabase, Docker, Kubernetes, PyTorch, AWS, Cursor, OpenAI API, RAG
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stack Sections - Following Hobbies style */}
        <div className="space-y-4">
          {stackSections.map((section) => (
            <div
              key={section.key}
              className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
                expandedSections.includes(section.key)
                  ? "border-gray-200 dark:border-gray-700"
                  : "hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                    {section.icon}
                  </div>
                  <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
                    {section.title}
                  </h3>
                </div>
                {expandedSections.includes(section.key) ? (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.includes(section.key) && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="pt-4">{section.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Currently Exploring Section - Moved to bottom */}
        <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold font-heading text-gray-900 dark:text-custom_dark">
              Currently Exploring
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Always learning, always growing. Here&apos;s what&apos;s capturing
            my attention and expanding my skillset:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentlyExploring.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span
                  className={`px-3 py-1.5 text-xs font-medium text-white rounded-full ${item.color}`}
                >
                  {item.name}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

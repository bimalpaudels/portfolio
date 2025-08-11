"use client";

import Link from "next/link";
import { CursorIcon, AWSIcon } from "@/components/icons";
import { TechItem } from "@/components/TechItem";
// SimpleIcons imports
import {
  siPytorch,
  siOpenai,
  siHuggingface,
  siPython,
  siDjango,
  siFastapi,
  siExpress,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siReact,
  siPostgresql,
  siSupabase,
  siDocker,
  siKubernetes,
  siRedis,
} from "simple-icons";

import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Brain,
  Server,
  Database,
  Sparkles,
  Monitor,
} from "lucide-react";
import { useState, useEffect } from "react";


export default function Stack() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSections, setExpandedSections] = useState<string[]>(["ai"]);

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

  const stackCategories = [
    {
      key: "ai",
      title: "AI & Machine Learning",
      icon: <Brain className="h-5 w-5" />,
      description: (
        <div className="space-y-3 text-sm mb-6">
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
      technologies: [
        {
          name: "PyTorch",
          icon: { type: 'simple' as const, data: siPytorch },
        },
        {
          name: "Hugging Face",
          icon: { type: 'simple' as const, data: siHuggingface },
        },
        {
          name: "Cursor",
          icon: { 
            type: 'custom' as const, 
            component: (
              <div className="w-5 h-5 flex items-center justify-center" data-icon="cursor">
                <CursorIcon size={28} />
              </div>
            ),
          },
        },
        {
          name: "OpenAI API",
          icon: { type: 'simple' as const, data: siOpenai },
        },
      ],
    },
    {
      key: "backend",
      title: "Backend & APIs",
      icon: <Server className="h-5 w-5" />,
      description: (
        <div className="space-y-3 text-sm mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            I primarily build backend systems with Django and FastAPI, choosing
            between them based on project complexity and performance
            requirements. For Node.js ecosystems, I work with Express.js when a
            particular project requires it.
          </p>
        </div>
      ),
      technologies: [
        {
          name: "Python",
          icon: { type: 'simple' as const, data: siPython },
        },
        {
          name: "Django",
          icon: { type: 'simple' as const, data: siDjango },
        },
        {
          name: "FastAPI",
          icon: { type: 'simple' as const, data: siFastapi },
        },
        {
          name: "Express.js",
          icon: { type: 'simple' as const, data: siExpress },
        },
      ],
    },
    {
      key: "frontend",
      title: "Frontend Development",
      icon: <Monitor className="h-5 w-5" />,
      description: (
        <div className="space-y-3 text-sm mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            My go-to stack is Next.js with TypeScript and Tailwind CSS.
            I&apos;ve shipped everything from complex dashboards to simple web
            applications such as this portfolio using this combination.
          </p>
        </div>
      ),
      technologies: [
        {
          name: "Next.js",
          icon: { type: 'simple' as const, data: siNextdotjs },
        },
        {
          name: "TypeScript",
          icon: { type: 'simple' as const, data: siTypescript },
        },
        {
          name: "Tailwind CSS",
          icon: { type: 'simple' as const, data: siTailwindcss },
        },
        {
          name: "React",
          icon: { type: 'simple' as const, data: siReact },
        },
      ],
    },
    {
      key: "data",
      title: "Data & Infrastructure",
      icon: <Database className="h-5 w-5" />,
      description: (
        <div className="space-y-3 text-sm mb-6">
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
      technologies: [
        {
          name: "PostgreSQL",
          icon: { type: 'simple' as const, data: siPostgresql },
        },
        {
          name: "Supabase",
          icon: { type: 'simple' as const, data: siSupabase },
        },
        {
          name: "Docker",
          icon: { type: 'simple' as const, data: siDocker },
        },
        {
          name: "Kubernetes",
          icon: { type: 'simple' as const, data: siKubernetes },
        },
        {
          name: "AWS",
          icon: { 
            type: 'custom' as const, 
            component: (
              <div className="w-5 h-5 flex items-center justify-center" data-icon="aws">
                <AWSIcon size={28} />
              </div>
            ),
          },
        },
        {
          name: "Redis",
          icon: { type: 'simple' as const, data: siRedis },
        },
      ],
    },
  ];

  const tldrItems = [
    "Python",
    "Django",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "Kubernetes",
    "PyTorch",
    "AWS",
    "Cursor",
    "OpenAI API",
    "RAG",
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

        {/* TLDR Section - Comma-separated, blends into body text */}
        <div className="mb-8">
          <h3 className="font-heading font-medium text-base text-gray-900 dark:text-custom_dark mb-2">
            TLDR
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            {tldrItems.join(", ")}.
          </p>
        </div>

        {/* Technology Stack - Categorized with Individual Tech Cards */}
        <div className="space-y-4">
          {stackCategories.map((category) => (
            <div
              key={category.key}
              className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
                expandedSections.includes(category.key)
                  ? "border-gray-200 dark:border-gray-700"
                  : "hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => toggleSection(category.key)}
                className="group w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 border border-transparent bg-transparent transition-all duration-200 group-hover:bg-white/50 dark:group-hover:bg-gray-800/40 group-hover:border-gray-200/50 dark:group-hover:border-gray-700/50 group-hover:backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
                    {category.title}
                  </h3>
                </div>
                {expandedSections.includes(category.key) ? (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.includes(category.key) && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="pt-4">
                    {/* Category Description */}
                    {category.description}

                    {/* Technology Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {category.technologies.map((tech, index) => (
                        <TechItem key={index} name={tech.name} icon={tech.icon} index={index} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Currently Exploring Section - Styled like category cards above */}
        <div
          className={`mt-8 rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
            expandedSections.includes("exploring")
              ? "border-gray-200 dark:border-gray-700"
              : "hover:border-gray-200 dark:hover:border-gray-700"
          }`}
        >
          <button
            onClick={() => toggleSection("exploring")}
            className="group w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 border border-transparent bg-transparent transition-all duration-200 group-hover:bg-white/50 dark:group-hover:bg-gray-800/40 group-hover:border-gray-200/50 dark:group-hover:border-gray-700/50 group-hover:backdrop-blur-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
                Currently Exploring
              </h3>
            </div>
            {expandedSections.includes("exploring") ? (
              <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          {expandedSections.includes("exploring") && (
            <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="pt-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  Always learning, always growing. Here&apos;s what&apos;s
                  capturing my attention and expanding my skillset:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {currentlyExploring.map((item, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/30 hover:border-gray-200/50 dark:hover:border-gray-700/50 hover:shadow-md hover:backdrop-blur-sm"
                    >
                      <div className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 border border-transparent bg-transparent shadow-sm group-hover:scale-110 transition-all duration-300 group-hover:bg-white/50 dark:group-hover:bg-gray-800/40 group-hover:border-gray-200/50 dark:group-hover:border-gray-700/50 group-hover:backdrop-blur-sm">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-xs text-gray-900 dark:text-custom_dark leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

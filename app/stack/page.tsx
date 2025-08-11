"use client";

import Link from "next/link";
import { CursorIcon, AWSIcon } from "@/components/icons";
import { CategorySection } from "@/components/CategorySection";
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

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Stack() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["ai"]);

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
      description:
        "I work on deep learning models with PyTorch and work extensively with the Hugging Face Transformers ecosystem for NLP tasks and projects. I use Cursor as my LLM powered IDE to mainly take advantage of its Tab feature but also with designing frontend components, debugging and few other things. Before Cursor, I had integrated v0 to my workflow and I thought that was the best approach. Now I can't even imagine moving back and forth from browser to IDE.",
      technologies: [
        { name: "PyTorch", icon: siPytorch },
        { name: "Hugging Face", icon: siHuggingface },
        {
          name: "Cursor",
          icon: (
            <div
              className="w-5 h-5 flex items-center justify-center"
              data-icon="cursor"
            >
              <CursorIcon size={28} />
            </div>
          ),
        },
        { name: "OpenAI API", icon: siOpenai },
      ],
    },
    {
      key: "backend",
      title: "Backend & APIs",
      description:
        "I primarily build backend systems with Django and FastAPI, choosing between them based on project complexity and performance requirements. For Node.js ecosystems, I work with Express.js when a particular project requires it.",
      technologies: [
        { name: "Python", icon: siPython },
        { name: "Django", icon: siDjango },
        { name: "FastAPI", icon: siFastapi },
        { name: "Express.js", icon: siExpress },
      ],
    },
    {
      key: "frontend",
      title: "Frontend Development",
      description:
        "My go-to stack is Next.js with TypeScript and Tailwind CSS. I've shipped everything from complex dashboards to simple web applications such as this portfolio using this combination.",
      technologies: [
        { name: "Next.js", icon: siNextdotjs },
        { name: "TypeScript", icon: siTypescript },
        { name: "Tailwind CSS", icon: siTailwindcss },
        { name: "React", icon: siReact },
      ],
    },
    {
      key: "data",
      title: "Data & Infrastructure",
      description:
        "I primarily use PostgreSQL for relational data, though I have extensive MySQL experience. Supabase has become my default choice for new projects—its real-time capabilities and especially integrated auth have streamlined my development workflow significantly. Redis is the obvious choice for caching layer. My deployment strategy revolves around Docker for containerization and that's something I have experience with professionally, where I have used it with multiple full-stack applications alongside Compose. I've also learnt and used Kubernetes for orchestration for my personal projects hosted locally.",
      technologies: [
        { name: "PostgreSQL", icon: siPostgresql },
        { name: "Supabase", icon: siSupabase },
        { name: "Docker", icon: siDocker },
        { name: "Kubernetes", icon: siKubernetes },
        {
          name: "AWS",
          icon: (
            <div
              className="w-5 h-5 flex items-center justify-center"
              data-icon="aws"
            >
              <AWSIcon size={28} />
            </div>
          ),
        },
        { name: "Redis", icon: siRedis },
      ],
    },
    {
      key: "exploring",
      title: "Currently Exploring",
      description:
        "Always learning, always growing. Here's what's capturing my attention and expanding my skillset:",
      technologies: [
        { name: "Rust", icon: "Systems programming and WebAssembly" },
        { name: "Three.js", icon: "3D web experiences and WebGL" },
        { name: "AI Integration", icon: "LLMs and AI-powered applications" },
        { name: "Edge Computing", icon: "Distributed systems and performance" },
      ],
      isSpecial: true,
    },
  ];

  return (
    <div className="container max-w-[65ch] mx-auto px-4 py-16">
      {/* Code Philosophy */}
      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          I architect solutions primarily in Python, leveraging its versatility
          across backend development, AI research, and data analytics. I also
          have experience working with Typescript/Javascript. My approach
          centers on building scalable systems that can evolve. I try to
          prioritize clean, maintainable code that performs well technically.
        </p>
      </div>

      {/* TLDR Section - Comma-separated, blends into body text */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-custom_dark mb-2">
          TLDR:
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          Python, Django, FastAPI, Next.js, TypeScript, Tailwind, PostgreSQL,
          Supabase, Docker, Kubernetes, PyTorch, AWS, Cursor, OpenAI API, RAG
        </p>
      </div>

      {/* Technology Stack - All categories including Currently Exploring */}
      <div className="space-y-4">
        {stackCategories.map((category) => (
          <CategorySection
            key={category.key}
            title={category.title}
            description={category.description}
            technologies={category.technologies}
            isExpanded={expandedSections.includes(category.key)}
            onToggle={() => toggleSection(category.key)}
            isSpecialSection={category.isSpecial || false}
          />
        ))}
      </div>
    </div>
  );
}

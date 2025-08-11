import { CursorIcon, AWSIcon } from "@/components/icons";
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
  siGo,
  siN8n,
} from "simple-icons";

export const stackCategories = [
  {
    key: "ai",
    title: "AI & Machine Learning",
    description:
      "I use Cursor as my LLM powered IDE to mainly take advantage of its Tab feature but also with designing frontend components, debugging and few other things. Before Cursor, I had integrated v0 to my workflow and I thought that was the best approach. Now I can't even imagine moving back and forth from browser to IDE.\n\n I work on deep learning models with PyTorch and work extensively with the Hugging Face Transformers ecosystem for NLP tasks and projects. \n\n ",
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
      "I primarily use PostgreSQL for relational data, though I have extensive MySQL experience. Supabase has become my default choice for new projects—its real-time capabilities and especially integrated auth have streamlined my development workflow significantly. Redis is the obvious choice for caching layer. \n\n My deployment strategy revolves around Docker for containerization and that's something I have experience with professionally, where I have used it with multiple full-stack applications alongside Compose. I've also learnt and used Kubernetes for orchestration for my personal projects hosted locally.",
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
      "Recently I've been having a lot of fun working with Go, and I'm learning n8n as well.",
    technologies: [
      { name: "Go", icon: siGo },
      { name: "n8n", icon: siN8n },
    ],
    isSpecial: true,
  },
];

export const tldrItems = [
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

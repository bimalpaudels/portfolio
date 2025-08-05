import { Header } from "@/components";

export const metadata = {
  title: "Stack",
};

export default function Stack() {
  return (
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <h1>Stack</h1>
        
        <h2>TLDR</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Python, Django, FastAPI, Next.js, TypeScript, Tailwind, PostgreSQL, Supabase, Docker, Kubernetes, PyTorch, AWS, Cursor, OpenAI API, RAG
        </p>

        <h2>Core Languages & Architecture Philosophy</h2>
        <p className="text-gray-900 dark:text-gray-100">
          I architect solutions primarily in Python, leveraging its versatility across backend development, AI research, and data analytics. I also have experience working with Typescript/Javascript. My approach centers on building scalable systems that can evolve—I try to prioritize clean, maintainable code that performs well technically.
        </p>

        <h2>AI & Machine Learning</h2>
        <p className="text-gray-900 dark:text-gray-100">
          I work on deep learning models with PyTorch and work extensively with the Hugging Face Transformers ecosystem for NLP tasks and projects.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          I use Cursor as my LLM powered IDE to mainly take advantage of its Tab feature but also with designing frontend components, debugging and few other things. Before Cursor, I had integrated v0 to my workflow and I thought that was the best approach. Now I can&apos;t even imagine moving back and forth from browser to IDE.
        </p>

        <h2>Backend & APIs</h2>
        <p className="text-gray-900 dark:text-gray-100">
          I primarily build backend systems with Django and FastAPI, choosing between them based on project complexity and performance requirements. For Node.js ecosystems, I work with Express.js when a particular project requires it.
        </p>

        <h2>Frontend Development</h2>
        <p className="text-gray-900 dark:text-gray-100">
          My go-to stack is Next.js with TypeScript and Tailwind CSS. I&apos;ve shipped everything from complex dashboards to simple web applications such as this portfolio using this combination.
        </p>

        <h2>Data & Infrastructure</h2>
        <p className="text-gray-900 dark:text-gray-100">
          I primarily use PostgreSQL for relational data, though I have extensive MySQL experience. Supabase has become my default choice for new projects—its real-time capabilities and especially integrated auth have streamlined my development workflow significantly. Redis is the obvious choice for caching layer.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          My deployment strategy revolves around Docker for containerization and that&apos;s something I have experience with professionally, where I have used it with multiple full-stack applications alongside Compose. I&apos;ve also learnt and used Kubernetes for orchestration for my personal projects hosted locally.
        </p>

        <h2>Current Learning & Evolution</h2>
        <p className="text-gray-900 dark:text-gray-100">
          I&apos;m constantly trying to evolve my stack based on real-world challenges and changing technical landscapes. For example, I am integrating the power of LLMs on multiple personal projects to improve and keep up with the change. My goal is always finding the right tool for each specific problem rather than forcing every solution into familiar patterns.
        </p>
      </div>
    </div>
  );
}

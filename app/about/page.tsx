"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  ChevronDown,
  ChevronRight,
  Mail,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "experience",
  ]);

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

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechFlow GmbH",
      location: "Berlin, Germany",
      period: "2023 - Present",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting microservices solutions.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Led migration to microservices architecture",
        "Mentored 3 junior developers",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "StartupLab",
      location: "Berlin, Germany",
      period: "2022 - 2023",
      description:
        "Developed MVP products for early-stage startups, focusing on rapid prototyping and user feedback integration.",
      achievements: [
        "Built 5+ MVP applications from concept to launch",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Collaborated with design team on user experience improvements",
      ],
    },
    {
      title: "Junior Developer",
      company: "Digital Solutions Nepal",
      location: "Kathmandu, Nepal",
      period: "2021 - 2022",
      description:
        "Started career building web applications for local businesses, learning modern development practices and agile methodologies.",
      achievements: [
        "Delivered 10+ client projects on time and within budget",
        "Learned React, Node.js, and modern development workflows",
        "Contributed to open-source projects",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      period: "2018 - 2021",
      description:
        "Focused on software engineering, algorithms, and web technologies. Graduated with distinction.",
    },
  ];

  const skills = [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Go"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "FastAPI", "PostgreSQL"],
    },
    { category: "Tools", items: ["Docker", "AWS", "Git", "Linux"] },
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

        {/* Hero Section with Blended Image */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 font-heading text-gray-900 dark:text-custom_dark">
                Bimal Paudel
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                Full-Stack Developer
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Passionate full-stack developer with 3+ years of experience
                building scalable web applications. Based in Berlin, originally
                from Nepal. I specialize in React, Node.js, and modern web
                technologies.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span>bimal@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span>Berlin, Germany</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span>Available for projects</span>
                </div>
              </div>
            </div>

            <div className="md:w-48 flex-shrink-0">
              <div className="w-48 h-48 mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format"
                  alt="Bimal Paudel"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Tech Stacks and Hobbies */}
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-sm text-gray-900 dark:text-custom_dark underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 mb-4">
                Tech Stacks
              </h3>
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="sm:w-1/3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Frontend & Backend
                    </span>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      React, Next.js, TypeScript, Python, FastAPI, PostgreSQL,
                      Docker, AWS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-gray-900 dark:text-custom_dark underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 mb-4">
                Hobbies
              </h3>
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="sm:w-1/3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Personal Interests
                    </span>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Open Source, Reading, Hiking, Photography, Cooking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CV Sections */}
        <div className="space-y-6">
          {/* Experience Section */}
          <div
            className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
              expandedSections.includes("experience")
                ? "border-gray-200 dark:border-gray-700"
                : "hover:border-gray-200 dark:hover:border-gray-700"
            }`}
          >
            <button
              onClick={() => toggleSection("experience")}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
            >
              <h2 className="text-xl font-semibold font-heading text-gray-900 dark:text-custom_dark">
                Experience
              </h2>
              {expandedSections.includes("experience") ? (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            {expandedSections.includes("experience") && (
              <div className="px-4 pb-4 space-y-6 border-t border-gray-200 dark:border-gray-700">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 pt-4"
                  >
                    <h3 className="font-semibold text-lg font-heading text-gray-900 dark:text-custom_dark">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {job.period}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {job.description}
                    </p>
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Education Section */}
          <div
            className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
              expandedSections.includes("education")
                ? "border-gray-200 dark:border-gray-700"
                : "hover:border-gray-200 dark:hover:border-gray-700"
            }`}
          >
            <button
              onClick={() => toggleSection("education")}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
            >
              <h2 className="text-xl font-semibold font-heading text-gray-900 dark:text-custom_dark">
                Education
              </h2>
              {expandedSections.includes("education") ? (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            {expandedSections.includes("education") && (
              <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 pt-4"
                  >
                    <h3 className="font-semibold text-lg font-heading text-gray-900 dark:text-custom_dark">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.institution} • {edu.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {edu.period}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div
            className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
              expandedSections.includes("skills")
                ? "border-gray-200 dark:border-gray-700"
                : "hover:border-gray-200 dark:hover:border-gray-700"
            }`}
          >
            <button
              onClick={() => toggleSection("skills")}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
            >
              <h2 className="text-xl font-semibold font-heading text-gray-900 dark:text-custom_dark">
                Skills
              </h2>
              {expandedSections.includes("skills") ? (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            {expandedSections.includes("skills") && (
              <div className="px-4 pb-4 grid md:grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="pt-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="p-4 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200">
            <h3 className="font-semibold mb-3 font-heading text-gray-900 dark:text-custom_dark">
              Languages
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  English
                </span>
                <span className="text-gray-500 dark:text-gray-400">Fluent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">German</span>
                <span className="text-gray-500 dark:text-gray-400">
                  Intermediate
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Nepali</span>
                <span className="text-gray-500 dark:text-gray-400">Native</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

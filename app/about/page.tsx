"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  ChevronDown,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ExperienceCard, HobbiesCard } from "@/components";

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

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
      title: "Bachelor of Computer Science",
      institution: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      period: "2018 - 2021",
      description:
        "Focused on software engineering, algorithms, and web technologies. Graduated with distinction.",
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

        {/* Hero Section with Blended Image */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-3 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1 font-heading text-gray-900 dark:text-custom_dark">
                Bimal Paudel
              </h1>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Software Developer | Python | AI Engineer
              </p>

              {/* Available Status */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  Available for hire
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                Passionate full-stack developer with 3+ years of experience
                building scalable web applications. Based in Berlin, originally
                from Nepal.
              </p>

              {/* Contact Information - Same Line */}
              <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                  <span>bimal@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                  <span>Tech Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 decoration-gray-400 dark:decoration-gray-500 hover:text-gray-900 dark:hover:text-custom_dark transition-colors duration-200"
                  >
                    resume.pdf
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-40 flex-shrink-0">
              <div className="w-40 h-42 mt-2 mx-auto md:mx-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format"
                  alt="Bimal Paudel"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CV Sections */}
        <div className="space-y-6">
          {/* Experience Section */}
          <ExperienceCard
            title="Experience"
            items={experience}
            sectionKey="experience"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {/* Education Section */}
          <ExperienceCard
            title="Education"
            items={education}
            sectionKey="education"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {/* Languages */}
          <div
            className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
              expandedSections.includes("languages")
                ? "border-gray-200 dark:border-gray-700"
                : "hover:border-gray-200 dark:hover:border-gray-700"
            }`}
          >
            <button
              onClick={() => toggleSection("languages")}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
            >
              <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
                Languages
              </h3>
              {expandedSections.includes("languages") ? (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            {expandedSections.includes("languages") && (
              <div className="px-4 pb-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-4 text-sm pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
                      <span className="text-gray-900 dark:text-gray-100 text-sm font-bold">
                        EN
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          English
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          Fluent
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-black dark:bg-white h-2 rounded-full shadow-md"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
                      <span className="text-gray-900 dark:text-gray-100 text-base font-bold">
                        🇩🇪
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          German
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          Intermediate
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-black dark:bg-white h-2 rounded-full shadow-md"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
                      <span className="text-gray-900 dark:text-gray-100 text-base font-bold">
                        🇳🇵
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          Nepali
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          Native
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-black dark:bg-white h-2 rounded-full shadow-md"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hobbies */}
          <HobbiesCard
            sectionKey="hobbies"
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>
      </div>
    </div>
  );
}

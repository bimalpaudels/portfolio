"use client";

import { CategorySection } from "@/components/CategorySection";
import { stackCategories, tldrItems } from "@/data/stackData";
import { PageHeader } from "@/components";

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

  return (
    <div className="container max-w-[65ch] mx-auto px-4 py-16">
      <PageHeader currentPage="stack" />
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

      {/* TLDR Section */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-base text-gray-900 dark:text-custom_dark mb-2">
          TLDR:
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          {tldrItems.join(", ")}
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

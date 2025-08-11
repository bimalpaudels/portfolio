import { ChevronDown, ChevronRight } from "lucide-react";

interface ExperienceItem {
  title: string;
  company?: string;
  institution?: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

interface ExperienceCardProps {
  title: string;
  items: ExperienceItem[];
  sectionKey: string;
  expandedSections: string[];
  toggleSection: (section: string) => void;
}

export default function ExperienceCard({
  title,
  items,
  sectionKey,
  expandedSections,
  toggleSection,
}: ExperienceCardProps) {
  const isExpanded = expandedSections.includes(sectionKey);

  return (
    <div
      className={`rounded-lg overflow-hidden transition-all duration-200 border  ${
        isExpanded
          ? "border-gray-300 dark:border-gray-700"
          : "hover:border-gray-300 dark:hover:border-gray-700 border-transparent"
      }`}
    >
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
      >
        <h2 className="text-lg font-medium font-heading text-gray-900 dark:text-custom_dark">
          {title}
        </h2>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-6 border-t border-gray-200 dark:border-gray-700">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 pt-4"
            >
              <h3 className="font-semibold text-base text-gray-900 dark:text-custom_dark mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {item.company || item.institution} • {item.location}
              </p>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                {item.period}
              </p>
              {!item.achievements || item.achievements.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                  {item.description}
                </p>
              ) : (
                <ul className="space-y-1 list-disc pl-4">
                  {item.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 dark:text-gray-400"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

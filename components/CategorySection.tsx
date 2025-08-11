import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TechItem } from "./TechItem";

interface CategorySectionProps {
  title: string;
  description: string;
  technologies: Array<{
    name: string;
    icon: any;
  }>;
  isExpanded: boolean;
  onToggle: () => void;
  isSpecialSection?: boolean;
}

export function CategorySection({
  title,
  description,
  technologies,
  isExpanded,
  onToggle,
  isSpecialSection = false,
}: CategorySectionProps) {
  const renderTechItems = () => {
    if (isSpecialSection) {
      // Special rendering for "Currently Exploring" section
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {technologies.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/30 hover:border-gray-200/50 dark:hover:border-gray-700/50 hover:shadow-md hover:backdrop-blur-sm"
            >
              <div className="p-3">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-gray-900 dark:text-custom_dark leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
                      {item.icon}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Regular tech items
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {technologies.map((tech, index) => (
          <TechItem
            key={index}
            name={tech.name}
            icon={tech.icon}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`rounded-lg overflow-hidden transition-all duration-200 border border-transparent ${
        isExpanded
          ? "border-gray-300 dark:border-gray-700"
          : "hover:border-gray-300 dark:hover:border-gray-700"
      }`}
    >
      <button
        onClick={onToggle}
        className="group w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
      >
        <div className="flex items-center">
          <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
            {title}
          </h3>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-4">
            {/* Category Description */}
            <div className="space-y-3 text-sm mb-6">
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>

            {/* Technology Cards */}
            {renderTechItems()}
          </div>
        </div>
      )}
    </div>
  );
}

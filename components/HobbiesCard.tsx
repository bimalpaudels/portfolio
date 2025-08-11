import {
  ChevronDown,
  ChevronRight,
  Github,
  Brain,
  Bike,
  Trophy,
  ChefHat,
} from "lucide-react";

interface HobbiesCardProps {
  sectionKey: string;
  expandedSections: string[];
  toggleSection: (section: string) => void;
}

export default function HobbiesCard({
  sectionKey,
  expandedSections,
  toggleSection,
}: HobbiesCardProps) {
  const isExpanded = expandedSections.includes(sectionKey);

  const hobbies = [
    {
      name: "Cycling",
      description: "Once did 110 KM in 6 hrs",
      icon: <Bike className="h-5 w-5" />,
      color: "orange",
    },
    {
      name: "Chess",
      description: "Bullet ~1600 ranking",
      icon: <Brain className="h-5 w-5" />,
      color: "green",
    },
    {
      name: "Watching Sports",
      description: "Football, NBA, everything",
      icon: <Trophy className="h-5 w-5" />,
      color: "purple",
    },
    {
      name: "Open Source",
      description: "Trying to move from interest to hobby",
      icon: <Github className="h-5 w-5" />,
      color: "blue",
    },
    {
      name: "Cooking",
      description: "Mostly Nepali food",
      icon: <ChefHat className="h-5 w-5" />,
      color: "amber",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-blue-300 dark:border-blue-600",
        text: "text-blue-600 dark:text-blue-400",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        border: "border-green-300 dark:border-green-600",
        text: "text-green-600 dark:text-green-400",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        border: "border-orange-300 dark:border-orange-600",
        text: "text-orange-600 dark:text-orange-400",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        border: "border-purple-300 dark:border-purple-600",
        text: "text-purple-600 dark:text-purple-400",
      },
      amber: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        border: "border-amber-300 dark:border-amber-600",
        text: "text-amber-600 dark:text-amber-400",
      },
    };
    return colorMap[color as keyof typeof colorMap];
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
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-t-lg"
      >
        <h3 className="font-medium text-base font-heading text-gray-900 dark:text-custom_dark">
          Hobbies & Interests
        </h3>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hobbies.map((hobby, index) => {
                const colors = getColorClasses(hobby.color);
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center ${colors.text} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {hobby.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-custom_dark mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                            {hobby.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {hobby.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

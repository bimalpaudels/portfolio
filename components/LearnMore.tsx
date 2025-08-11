import { Link } from "next-view-transitions";

interface LearnMoreSection {
  title: string;
  description: string;
}

interface LearnMoreProps {
  sections: LearnMoreSection[];
}

const getSectionHref = (title: string) => {
  switch (title.toLowerCase()) {
    case "about me":
      return "/about";
    case "tech stack":
      return "/stack";
    default:
      return "#";
  }
};

export default function LearnMore({ sections }: LearnMoreProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-start gap-6"
        >
          <div className="sm:w-1/3">
            <Link
              href={getSectionHref(section.title)}
              className="font-medium text-sm text-gray-900 dark:text-gray-100 underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {section.title}
            </Link>
          </div>
          <div className="sm:w-2/3">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
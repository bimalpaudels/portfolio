import { Link } from "next-view-transitions";

interface PageHeaderProps {
  currentPage: string;
}

export default function PageHeader({ currentPage }: PageHeaderProps) {
  return (
    <div>
      <Link href="/" className="inline-block group hover:no-underline">
        <h2 className="mb-0 font-heading font-semibold text-xl pt-12 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-2 text-gray-900 dark:text-gray-100">
          bimals.net
        </h2>
      </Link>
      <div className="mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
          /{currentPage}
        </span>
      </div>
    </div>
  );
}

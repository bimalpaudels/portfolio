import { Link } from "next-view-transitions";
import {
  FileText,
  User,
  Code,
  FolderOpen,
  Github,
  Linkedin,
  ExternalLink,
  Mail,
} from "lucide-react";

interface NavigationLink {
  name: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
}

export default function HomeNavigation() {
  const navigationLinks: NavigationLink[] = [
    {
      name: "Projects",
      href: "/projects",
      icon: <FolderOpen className="w-4 h-4" />,
    },
    { name: "Posts", href: "/posts", icon: <FileText className="w-4 h-4" /> },
    { name: "Stack", href: "/stack", icon: <Code className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <User className="w-4 h-4" /> },
  ];

  const socialLinks: NavigationLink[] = [
    {
      name: "Email",
      href: "mailto:ibimalp@gmail.com",
      external: true,
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/bimalpaudels",
      external: true,
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/bimalpaudel/",
      external: true,
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "dotpy",
      href: "https://dotpy.bimals.net",
      external: true,
      icon: <ExternalLink className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-row gap-8 sm:gap-20">
        {/* Navigation Section */}
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-4">
            Navigation
          </h3>
          <div className="space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-4">
            Connect
          </h3>
          <div className="space-y-2">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

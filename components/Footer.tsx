import { Link } from "next-view-transitions";
import {
  FileText,
  User,
  Code,
  FolderOpen,
  Github,
  Linkedin,
  FileUser,
  Mail,
  ExternalLink,
  Heart,
} from "lucide-react";

interface NavigationLink {
  name: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
}

export default function Footer() {
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
      name: "Resume",
      href: "/resume.pdf",
      external: true,
      icon: <FileUser className="w-4 h-4" />,
    },
  ];

  const projectLinks: NavigationLink[] = [
    {
      name: "dotpy",
      href: "https://dotpy.bimals.net",
      external: true,
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      name: "lebenslauf",
      href: "https://cvmd.vercel.app",
      external: true,
      icon: <ExternalLink className="w-4 h-4" />,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200/80 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm">
      <div className="max-w-[65ch] mx-auto px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Navigation
            </h3>
            <div className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Projects
            </h3>
            <div className="space-y-3">
              {projectLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200/60 dark:border-gray-800/60">
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Thank you for checking out this personal website.
          </div>
        </div>
      </div>
    </footer>
  );
}

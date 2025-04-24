import { Link } from "next-view-transitions";

export default function Footer() {
  const links = [
    {
      name: "dotpy",
      url: "https://dotpy.bimals.net",
      target: "_blank",
    },
    { name: "posts", url: "/posts", target: "_self" },
    { name: "about", url: "/about", target: "_self" },
    { name: "stack", url: "/stack", target: "_self" },
    {
      name: "github",
      url: "https://github.com/bimalpaudels",
      target: "_blank",
    },
    {
      name: "linkedIn",
      url: "https://www.linkedin.com/in/bimalpaudel/",
      target: "_blank",
    },
  ];
  return (
    <footer className="mt-6 text-center">
      <div className="flex justify-center space-x-6 tracking-wide text-sm">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target={link.target}
            className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}

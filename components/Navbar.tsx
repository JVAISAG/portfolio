"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background border-b border-primary">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div className="flex items-center gap-2 font-bold text-sm md:text-base">
          <Link href="/">
            <span className="text-secondary hover:underline cursor-pointer">root@vj-portfolio</span>
          </Link>
          <span className="text-primary">:</span>
          <span className="text-primary">~</span>
          <span className="text-primary">$</span>
          <span className="animate-blink">_</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase tracking-wider text-xs md:text-sm hover:inverted px-2 py-1 transition-none ${
                  isActive ? "inverted font-bold" : "text-primary"
                }`}
              >
                [{link.name}]
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

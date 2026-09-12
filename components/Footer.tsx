import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-dashed border-primary">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="flex flex-col">
            <span className="uppercase text-secondary text-sm font-bold tracking-widest mb-1">
              [ SYSTEM STATUS : ONLINE ]
            </span>
            <span className="text-xs text-primary/70">
              CONNECTION: SECURE
            </span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/jvaisag"
              target="_blank"
              className="p-2 border border-primary hover:inverted transition-none group"
            >
              <Github className="w-5 h-5 group-hover:text-black" />
            </a>
            <a
              href="https://linkedin.com/in/vaisag-j"
              target="_blank"
              className="p-2 border border-primary hover:inverted transition-none group"
            >
              <Linkedin className="w-5 h-5 group-hover:text-black" />
            </a>
            <a
              href="mailto:jvaisag@gmail.com"
              className="p-2 border border-primary hover:inverted transition-none group"
            >
              <Mail className="w-5 h-5 group-hover:text-black" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-primary border-dashed text-left md:text-center text-primary/50 text-xs uppercase">
          (C) {currentYear} Vaisag J. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

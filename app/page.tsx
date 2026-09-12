"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "./welcome.sh";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto w-full">
        
        <div className="mb-8 font-bold text-xl md:text-2xl lg:text-4xl text-primary">
          <span className="text-secondary">root@vj-portfolio</span>:~$ {text}
          <span className="animate-blink">█</span>
        </div>

        {text === fullText && (
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 uppercase text-primary text-shadow-glow">
              Vaisag J
            </h1>
            
            <p className="text-sm uppercase tracking-widest text-secondary mb-6">
              [ ROLE: CYBERSECURITY & FULL STACK DEVELOPER ]
            </p>

            <div className="p-4 border border-primary border-dashed bg-background lowercase text-primary max-w-2xl">
              <p className="mb-2">
                &gt; Building secure, performant web applications with a focus on cybersecurity.
              </p>
              <p>
                &gt; Specialized in MERN stack development and protecting digital assets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="px-6 py-2 border border-primary hover:inverted uppercase font-bold text-sm tracking-widest transition-none"
              >
                [ Execute: View Projects ]
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2 border border-dashed border-primary hover:border-solid hover:inverted uppercase font-bold text-sm tracking-widest text-primary/70 hover:text-black transition-none"
              >
                [ Initialize: Contact ]
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-primary/50 border-dashed">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary mb-2">EXPERIENCE</p>
                  <p className="text-sm font-bold text-primary">[||||||||||.....] 3+ YRS</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary mb-2">PROJECTS</p>
                  <p className="text-sm font-bold text-primary">[|||||||||||||||] 15+</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary mb-2">STACK</p>
                  <p className="text-sm font-bold text-primary">[ MERN / FULLSTACK ]</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { SectionBadge } from "@/components/ui/badge";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0 .1-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0 .1 3.7 5.4 5.4 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

export function Projects() {
  const easeOut = [0.16, 1, 0.3, 1] as const;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  return (
    <section id="projects" className="py-28 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <SectionBadge className="mb-6">Portfolio</SectionBadge>
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of my recent technical projects, spanning backend engineering, 
            distributed systems, and full-stack development.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {siteConfig.projects.map((project, index) => (
            <motion.div 
              key={project.name}
              variants={fadeInUp}
              className="group flex flex-col bg-background rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold font-serif text-foreground group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-muted"
                      aria-label="View on GitHub"
                    >
                      <GithubIcon size={20} />
                    </a>
                  )}
                </div>
                
                <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">
                  {project.description}
                </p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-border mt-auto">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-muted/50 text-foreground text-xs font-mono rounded-md border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { SectionBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const easeOut = [0.16, 1, 0.3, 1] as const;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  };

  return (
    <section className="relative overflow-hidden py-28 md:py-44 px-6">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-start space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <SectionBadge>{siteConfig.hero.badge}</SectionBadge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-5xl md:text-[5.25rem] leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            {siteConfig.hero.headlinePrefix}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 gradient-text">
                {siteConfig.name}
              </span>
              <span className="gradient-underline" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg font-sans"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-4">
            <Button
              size="lg"
              onClick={() => {
                document
                  .getElementById("chat")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Interview
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setIsResumeOpen(true)}
            >
              View Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Abstract Generative Graphic */}
        <div className="relative hidden lg:block h-[500px] w-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-accent/20"
          />
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-2xl shadow-xl border border-border p-4 z-20"
          >
            <div className="h-4 w-1/2 bg-muted rounded-full mb-2" />
            <div className="h-4 w-3/4 bg-muted rounded-full" />
            <div className="absolute bottom-4 right-4 h-8 w-8 bg-gradient-to-br from-accent to-accent-secondary rounded-full" />
          </motion.div>
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-48 h-24 bg-foreground text-background rounded-2xl shadow-2xl p-4 z-30 flex flex-col justify-between"
          >
            <div className="font-mono text-xs text-muted-foreground">
              STATUS
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-medium text-sm">Available for work</span>
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl -z-10" />
        </div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setIsResumeOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-4xl h-[85vh] bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-[24px] flex flex-col z-10 overflow-hidden border border-border/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-border/50 bg-background z-20">
                <h3 className="text-xl font-bold text-foreground">Resume Overview</h3>
                <div className="flex items-center gap-4">
                  <a 
                    href={siteConfig.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-muted"
                  >
                    <ExternalLink size={16} />
                    Open in new tab
                  </a>
                  <button 
                    onClick={() => setIsResumeOpen(false)}
                    className="p-2 -mr-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Body */}
              <div className="flex-1 w-full bg-muted/10 relative p-6">
                <div className="w-full h-full rounded-[16px] overflow-hidden border border-border/50 shadow-sm bg-white">
                  <iframe 
                    src={siteConfig.resume} 
                    className="w-full h-full border-none"
                    title="Resume"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-border/50 bg-background z-20">
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-5 py-2.5 rounded-full hover:bg-muted"
                >
                  Cancel
                </button>
                <a 
                  href={siteConfig.resume} 
                  download
                  className="inline-flex items-center justify-center text-sm font-semibold transition-all duration-200 h-10 px-6 rounded-full bg-foreground text-background hover:opacity-90 shadow-sm hover:shadow-md"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

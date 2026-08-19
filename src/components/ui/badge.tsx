"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animated?: boolean;
}

export function SectionBadge({ children, animated = true, className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-5 py-2",
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        {animated && (
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
          />
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent font-medium">
        {children}
      </span>
    </div>
  )
}

"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden my-4 border border-border bg-[#1E1E1E]">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border/10 text-xs text-muted-foreground font-mono">
        <span className="uppercase tracking-wider">{language || 'text'}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors focus:outline-none"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-jetbrains-mono), monospace',
            }
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

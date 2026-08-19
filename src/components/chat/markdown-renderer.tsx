"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 leading-tight text-foreground" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3 leading-tight text-foreground" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 leading-tight text-foreground" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-4 mb-2 leading-tight text-foreground" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed last:mb-0" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 marker:text-muted-foreground" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2 marker:text-muted-foreground" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        a: ({ node, ...props }) => (
          <a 
            className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors font-medium break-words" 
            target="_blank" 
            rel="noopener noreferrer" 
            {...props} 
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-accent/50 pl-4 py-1 italic text-muted-foreground bg-muted/20 rounded-r-lg my-4" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto mb-4 rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border text-sm" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-muted/50" {...props} />,
        th: ({ node, ...props }) => <th className="px-4 py-2 font-semibold text-left text-foreground" {...props} />,
        td: ({ node, ...props }) => <td className="px-4 py-2 border-t border-border" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-6 border-border" {...props} />,
        pre: ({ children }: any) => <>{children}</>,
        code: ({ node, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          const isInline = !match && !String(children).includes('\n');

          if (!isInline) {
            return <CodeBlock language={language} value={String(children).replace(/\n$/, '')} />;
          }

          return (
            <code 
              className="px-1.5 py-0.5 rounded-md bg-muted font-mono text-[0.85em] text-foreground border border-border/50 break-words" 
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

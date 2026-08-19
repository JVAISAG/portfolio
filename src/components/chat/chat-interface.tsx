"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Loader2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MarkdownRenderer } from "./markdown-renderer";

type Message = {
  role: "user" | "system" | "assistant" | "error";
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: siteConfig.chat.assistantGreeting }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"Recruiter" | "Engineer">("Engineer");
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;
      setIsAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    if (isAutoScroll && endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isAutoScroll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setIsAutoScroll(true); // Force auto-scroll on new message

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1).map(m => ({ role: m.role, content: m.content })),
          mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.reply || `HTTP error ${response.status}`);
      }

      if (!response.body) throw new Error("No response body returned from server.");

      // Add a blank assistant message to stream into
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      setIsLoading(false); // Disable global loading state while streaming

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let text = "";
      let buffer = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ""; // Keep incomplete line in buffer
          
          for (const line of lines) {
            if (line.trim() === 'data: [DONE]') continue;
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                const content = data.choices?.[0]?.delta?.content || "";
                if (content) {
                  text += content;
                  setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], content: text };
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignore parse errors from partial JSON
              }
            }
          }
        }
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "error", content: error.message || "Connection failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <h3 className="font-semibold text-foreground">Interview AI</h3>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <button 
            onClick={() => setMode("Recruiter")}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${mode === "Recruiter" ? "bg-white text-accent shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Recruiter Mode
          </button>
          <button 
            onClick={() => setMode("Engineer")}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${mode === "Engineer" ? "bg-white text-accent shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Engineer Mode
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full mt-1 ${
                msg.role === "user" ? "bg-foreground text-white" : 
                msg.role === "error" ? "bg-red-500 text-white shadow-sm" :
                "bg-gradient-to-br from-accent to-accent-secondary text-white shadow-accent"
              }`}>
                {msg.role === "user" ? <User size={16} /> : msg.role === "error" ? <AlertCircle size={16} /> : <Bot size={16} />}
              </div>
              <div className={`flex flex-col gap-1 min-w-0 ${msg.role === "user" ? "items-end max-w-[85%]" : "items-start w-full max-w-[90%]"}`}>
                <div className={`px-5 py-4 rounded-2xl w-full text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-muted text-foreground rounded-tr-sm w-auto" 
                    : msg.role === "error"
                    ? "bg-red-50 border border-red-200 text-red-700 rounded-tl-sm w-auto"
                    : "bg-white border border-border shadow-sm text-foreground rounded-tl-sm overflow-hidden"
                }`}>
                  {msg.role === "user" || msg.role === "error" ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-white shadow-accent">
                <Bot size={16} />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-border shadow-sm text-foreground rounded-tl-sm flex items-center gap-2 text-sm">
                <Loader2 size={16} className="animate-spin text-accent" />
                Thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-border">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="pr-12"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            className="absolute right-1 hover:bg-transparent hover:text-accent disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            <Send size={18} />
          </Button>
        </form>
        <div className="mt-3 flex gap-2 flex-wrap">
          {siteConfig.chat.suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => { setInput(q); }}
              className="text-xs bg-muted hover:bg-accent/10 hover:text-accent text-muted-foreground px-3 py-1.5 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { ChatInterface } from "@/components/chat/chat-interface";
import { SectionBadge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Projects />
      
      {/* Interactive Chat Section */}
      <section id="chat" className="relative bg-foreground py-28 px-6 text-background overflow-hidden">
        {/* Dot pattern texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <SectionBadge className="border-white/20 bg-white/5 text-white mb-8">
            Interactive Experience
          </SectionBadge>
          
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-center">
            Interview My AI Clone
          </h2>
          <p className="text-white/60 mb-12 text-center max-w-2xl text-lg">
            Choose a persona mode below and ask questions about my background. 
            The responses are generated using Llama 3.3 and are strictly based on my real resume and experience.
          </p>
          
          <div className="w-full">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Built with Next.js, Tailwind CSS, and OpenRouter AI.
        </p>
      </footer>
    </main>
  );
}

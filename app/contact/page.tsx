"use client";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setStatus("idle"), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "jvaisag@gmail.com",
      href: "mailto:jvaisag@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9061378010",
      href: "tel:+919061378010",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "vaisag-j",
      href: "https://linkedin.com/in/vaisag-j",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "jvaisag",
      href: "https://github.com/jvaisag",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-32">
      <div className="mb-12">
        <span className="text-secondary">root@vj-portfolio</span>:~$ ./connect.sh
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 uppercase text-primary text-shadow-glow">
          ESTABLISH_CONNECTION
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-0 border border-primary border-dashed p-6 bg-background h-fit">
          <p className="text-sm uppercase tracking-widest text-secondary mb-6">[ AVAILABLE ENDPOINTS ]</p>
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                className="flex items-center gap-4 py-4 border-b border-primary border-dashed last:border-0 group hover:inverted transition-none px-2 -mx-2"
              >
                <Icon className="w-5 h-5 text-secondary group-hover:text-black" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary/70 group-hover:text-black">
                    {item.label}
                  </p>
                  <p className="text-primary group-hover:text-black lowercase">
                    {item.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="border border-primary p-6 bg-background">
          <p className="text-sm uppercase tracking-widest text-secondary mb-6">[ DIRECT MESSAGE ]</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-xs uppercase tracking-widest text-primary/70 mb-2">
                &gt; INPUT_NAME
              </label>
              <div className="flex items-center">
                <span className="text-secondary mr-2">$</span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none focus:outline-none text-primary"
                  spellCheck="false"
                />
                {focused === 'name' && <span className="animate-blink absolute right-0 text-primary">█</span>}
              </div>
              <div className="w-full h-px bg-primary/30 mt-1 border-dashed"></div>
            </div>
            
            <div className="relative">
              <label className="block text-xs uppercase tracking-widest text-primary/70 mb-2">
                &gt; INPUT_EMAIL
              </label>
              <div className="flex items-center">
                <span className="text-secondary mr-2">$</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none focus:outline-none text-primary"
                  spellCheck="false"
                />
                {focused === 'email' && <span className="animate-blink absolute right-0 text-primary">█</span>}
              </div>
              <div className="w-full h-px bg-primary/30 mt-1 border-dashed"></div>
            </div>
            
            <div className="relative">
              <label className="block text-xs uppercase tracking-widest text-primary/70 mb-2">
                &gt; INPUT_MESSAGE
              </label>
              <div className="flex items-start">
                <span className="text-secondary mr-2 mt-1">$</span>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none focus:outline-none text-primary resize-none"
                  spellCheck="false"
                />
                {focused === 'message' && <span className="animate-blink absolute right-0 top-1 text-primary">█</span>}
              </div>
              <div className="w-full h-px bg-primary/30 mt-1 border-dashed"></div>
            </div>
            
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 border border-primary hover:inverted transition-none text-sm uppercase tracking-widest font-bold disabled:opacity-50 disabled:hover:bg-background disabled:hover:text-primary"
            >
              {status === "sending" ? "[ TRANSMITTING... ]" : status === "success" ? "[ TRANSMISSION_SUCCESSFUL ]" : "[ INITIATE_TRANSMISSION ]"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

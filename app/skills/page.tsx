import { Code, Globe, Server, Database, Shield, Terminal } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: ["Python", "C", "C++", "JavaScript", "TypeScript"],
    },
    {
      title: "Frontend",
      icon: Globe,
      skills: ["React", "Next.js", "HTML/CSS", "Tailwind CSS"],
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express.js", "Socket.IO", "REST APIs"],
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["MongoDB", "MySQL"],
    },
    {
      title: "Security",
      icon: Shield,
      skills: ["JWT Auth", "AES Encryption", "RBAC", "OWASP"],
    },
    {
      title: "Tools",
      icon: Terminal,
      skills: ["Git", "Docker", "Linux", "Security Tools"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      <div className="mb-12">
        <span className="text-secondary">root@vj-portfolio</span>:~$ pkg-manager list --installed
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 uppercase text-primary text-shadow-glow">
          SYSTEM_MODULES
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="border border-primary p-6 bg-background relative overflow-hidden group hover:inverted transition-none">
              
              <div className="absolute top-0 right-0 p-2 text-[10px] text-primary/50 uppercase group-hover:text-black">
                [ OK ]
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-5 h-5 text-secondary group-hover:text-black" />
                <h3 className="text-sm uppercase font-bold tracking-widest group-hover:text-black">{category.title}</h3>
              </div>
              
              <div className="space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="text-xs uppercase flex items-center group-hover:text-black text-primary/80"
                  >
                    <span className="text-secondary mr-2 group-hover:text-black">├──</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

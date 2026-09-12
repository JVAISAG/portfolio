import { Github, ArrowUpRight, FolderGit2 } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  // Map Prisma project to frontend fields
  const title = project.title;
  const description = project.shortDesc;
  const tech = Array.isArray(project.tech) ? project.tech.join(" / ") : project.tech;
  const githubUrl = project.githubUrl;
  const liveUrl = project.liveUrl;
  const Icon = FolderGit2; // Default icon since it's not in the DB

  return (
    <div className="border border-primary group flex flex-col transition-none h-full bg-background hover:inverted">
      {/* Title Bar */}
      <div className="border-b border-primary p-2 flex justify-between items-center group-hover:border-black group-hover:bg-primary group-hover:text-black">
        <span className="uppercase text-xs font-bold tracking-widest">+--- {title} ---+</span>
        {project.featured && (
          <span className="text-[10px] uppercase border border-primary px-1 group-hover:border-black">
            [FEATURED]
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 border border-primary group-hover:border-black">
            <Icon className="w-6 h-6 group-hover:text-black" />
          </div>
          <div className="flex items-center gap-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                className="p-2 border border-primary group-hover:border-black hover:bg-black hover:text-primary transition-none"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                className="p-2 border border-primary group-hover:border-black hover:bg-black hover:text-primary transition-none"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs uppercase text-primary/70 mb-4 group-hover:text-black">
          &gt; TECH: {tech}
        </p>
        <p className="text-sm leading-relaxed mb-4 group-hover:text-black grow lowercase">
          {description}
        </p>
      </div>
    </div>
  );
}

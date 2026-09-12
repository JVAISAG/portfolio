import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export default async function Projects() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' }
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      <div className="mb-12">
        <span className="text-secondary">root@vj-portfolio</span>:~$ ls -al /projects
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 uppercase text-primary text-shadow-glow">
          PROJECTS
        </h2>
      </div>

      <div className="border border-primary border-dashed p-6 mb-16 bg-background">
        <p className="text-sm text-primary/80 leading-relaxed lowercase">
          &gt; A collection of active modules and executed operations.
          Showcasing skills in full-stack development and cybersecurity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 text-center text-primary/50 py-10 border border-primary/20 border-dashed">
            [ NO_PUBLISHED_PROJECTS_FOUND ]
          </div>
        ) : (
          projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

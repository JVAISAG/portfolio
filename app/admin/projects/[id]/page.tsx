import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getProjectById } from "@/app/admin/actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    return (
      <div className="min-h-screen p-8 text-primary font-mono text-center mt-20">
        <h1 className="text-3xl text-error">[ ERROR: PROJECT_NOT_FOUND ]</h1>
        <Link href="/admin/projects" className="mt-4 inline-block hover:underline">
          &lt; RETURN_TO_DATABASE
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-primary font-mono relative">
      <div className="max-w-4xl mx-auto border border-primary p-6 bg-background/95 relative overflow-hidden">
        <div className="mb-8 border-b border-primary border-dashed pb-4">
          <Link href="/admin/projects" className="text-secondary hover:underline mr-4">
            &lt; BACK
          </Link>
          <h1 className="inline-block text-2xl font-bold text-shadow-glow uppercase">
            EDIT_PROJECT: {project.slug}
          </h1>
        </div>

        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}

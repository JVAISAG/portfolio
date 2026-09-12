import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen p-8 text-primary font-mono relative">
      <div className="max-w-4xl mx-auto border border-primary p-6 bg-background/95 relative overflow-hidden">
        <div className="mb-8 border-b border-primary border-dashed pb-4">
          <Link href="/admin/projects" className="text-secondary hover:underline mr-4">
            &lt; BACK
          </Link>
          <h1 className="inline-block text-2xl font-bold text-shadow-glow uppercase">
            CREATE_NEW_PROJECT
          </h1>
        </div>

        <ProjectForm />
      </div>
    </div>
  );
}

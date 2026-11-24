import { getProjects } from "@/app/admin/actions";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import GithubImport from "@/components/admin/GithubImport";

export default async function AdminProjects() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const projects = await getProjects();

  return (
    <div className="min-h-screen p-8 text-primary font-mono relative">
      <div className="max-w-6xl mx-auto border border-primary p-6 bg-background/95 relative overflow-hidden">
        <div className="flex justify-between items-center mb-8 border-b border-primary border-dashed pb-4">
          <div>
            <Link href="/admin" className="text-secondary hover:underline mr-4">
              &lt; BACK
            </Link>
            <h1 className="inline-block text-2xl font-bold text-shadow-glow uppercase">
              PROJECTS_DATABASE
            </h1>
          </div>
          <div className="flex gap-4">
            <GithubImport />
            <Link
              href="/admin/projects/new"
              className="px-4 py-2 border border-primary hover:inverted transition-none text-sm uppercase tracking-widest font-bold"
            >
              [ ADD_NEW_PROJECT ]
            </Link>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 border border-primary border-dashed text-center opacity-80">
            [ NO_RECORDS_FOUND ]
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary text-secondary">
                  <th className="p-2">_TITLE</th>
                  <th className="p-2">_SLUG</th>
                  <th className="p-2">_STATUS</th>
                  <th className="p-2">_ORDER</th>
                  <th className="p-2 text-right">_ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-primary/30 hover:bg-primary/5">
                    <td className="p-2">{project.title}</td>
                    <td className="p-2 opacity-70">{project.slug}</td>
                    <td className="p-2">
                      {project.published ? (
                        <span className="text-primary">[PUB]</span>
                      ) : (
                        <span className="text-error">[DRF]</span>
                      )}
                      {project.featured && <span className="ml-2 text-secondary">[FEAT]</span>}
                    </td>
                    <td className="p-2">{project.order}</td>
                    <td className="p-2 text-right space-x-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-secondary hover:underline"
                      >
                        [EDIT]
                      </Link>
                      {/* Note: Delete requires a client component or server action form. We will just use a simple form to delete. */}
                      <form action={async () => {
                        "use server";
                        const { deleteProject } = await import("@/app/admin/actions");
                        await deleteProject(project.id);
                      }} className="inline-block">
                        <button type="submit" className="text-error hover:underline">
                          [DEL]
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

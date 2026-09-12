import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen p-8 text-primary font-mono relative">
      <div className="max-w-4xl mx-auto border border-primary p-6 bg-background/95 relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-shadow-glow uppercase">
          Admin Dashboard
        </h1>
        
        <div className="border border-primary border-dashed p-4 mb-8">
          <p className="text-secondary mb-2">System Status: ONLINE</p>
          <p>Logged in as: {session.user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/projects" className="border border-primary p-4 hover:bg-primary/10 hover:inverted transition-none cursor-pointer group">
            <h2 className="text-xl mb-2 text-secondary group-hover:text-black">[ Manage Projects ]</h2>
            <p className="text-sm opacity-80 group-hover:text-black">Add, edit, or remove portfolio projects.</p>
          </Link>
          <Link href="/admin/settings" className="border border-primary p-4 hover:bg-primary/10 hover:inverted transition-none cursor-pointer group">
            <h2 className="text-xl mb-2 text-secondary group-hover:text-black">[ System Settings ]</h2>
            <p className="text-sm opacity-80 group-hover:text-black">Configure site preferences and variables.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

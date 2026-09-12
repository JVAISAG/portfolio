import { signIn } from "@/lib/auth/auth";
import { Github } from "lucide-react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="max-w-md w-full border border-primary p-8 bg-background relative overflow-hidden">
        {/* Terminal decorative elements */}
        <div className="absolute top-0 right-0 p-2 text-[10px] text-primary/50 uppercase">
          [ AUTH_REQUIRED ]
        </div>

        <div className="mb-8">
          <span className="text-secondary">root@vj-portfolio</span>:~$ ./authenticate.sh
          <h2 className="text-3xl font-bold tracking-tight mt-4 uppercase text-primary text-shadow-glow">
            ADMIN_ACCESS
          </h2>
        </div>

        <div className="border border-primary border-dashed p-4 mb-8 bg-background">
          <p className="text-sm text-primary/80 leading-relaxed lowercase mb-4">
            &gt; Authentication protocol initiated.
            <br />
            &gt; Identity verification required for system administration.
            <br />
            &gt; Only authorized keys will be accepted.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-primary hover:inverted transition-none text-sm uppercase tracking-widest font-bold group"
          >
            <Github className="w-5 h-5 text-secondary group-hover:text-black" />
            [ AUTHENTICATE_VIA_GITHUB ]
          </button>
        </form>
      </div>
    </div>
  );
}

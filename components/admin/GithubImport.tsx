"use client";

import { useState } from "react";
import { importGithubProjects } from "@/app/admin/actions";
import { Github, Download, Loader2, X } from "lucide-react";

export default function GithubImport() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");

  const fetchRepos = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error("Failed to fetch repositories");
      const data = await res.json();
      setRepos(data.filter((r: any) => !r.fork)); // Ignore forks by default
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedRepos.length === repos.length) {
      setSelectedRepos([]);
    } else {
      setSelectedRepos(repos.map((r) => r.id.toString()));
    }
  };

  const toggleRepo = (id: string) => {
    setSelectedRepos((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

  const handleImport = async () => {
    if (selectedRepos.length === 0) return;
    setImporting(true);
    setError("");
    try {
      const reposToImport = repos.filter((r) => selectedRepos.includes(r.id.toString()));
      await importGithubProjects(reposToImport);
      setIsOpen(false);
      setRepos([]);
      setSelectedRepos([]);
      setUsername("");
    } catch (err: any) {
      setError(err.message || "Failed to import projects");
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-background transition-none text-sm uppercase tracking-widest font-bold flex items-center gap-2"
      >
        <Github size={16} />
        [ IMPORT_GITHUB ]
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-background border border-primary p-6 w-full max-w-2xl max-h-[80vh] flex flex-col relative shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-primary hover:text-error"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
              <Github /> GITHUB_IMPORT
            </h2>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchRepos()}
                className="flex-1 bg-transparent border border-primary p-2 text-primary focus:outline-none focus:border-secondary"
              />
              <button
                onClick={fetchRepos}
                disabled={loading || !username}
                className="px-4 py-2 border border-primary hover:bg-primary hover:text-background disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "FETCH"}
              </button>
            </div>

            {error && <div className="text-error mb-4">Error: {error}</div>}

            {repos.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-2 text-sm text-secondary">
                  <span>Found {repos.length} repositories</span>
                  <button onClick={handleSelectAll} className="hover:underline">
                    [{selectedRepos.length === repos.length ? "DESELECT_ALL" : "SELECT_ALL"}]
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto border border-primary p-2 mb-6 space-y-2 max-h-[40vh]">
                  {repos.map((repo) => (
                    <label
                      key={repo.id}
                      className="flex items-start gap-3 p-2 hover:bg-primary/10 cursor-pointer border border-transparent hover:border-primary/30"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRepos.includes(repo.id.toString())}
                        onChange={() => toggleRepo(repo.id.toString())}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-bold text-primary">{repo.name}</div>
                        <div className="text-sm opacity-70 line-clamp-1">
                          {repo.description || "No description provided"}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleImport}
                    disabled={importing || selectedRepos.length === 0}
                    className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-background disabled:opacity-50 flex items-center gap-2 font-bold"
                  >
                    {importing ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Download size={18} />
                    )}
                    IMPORT {selectedRepos.length} PROJECTS
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

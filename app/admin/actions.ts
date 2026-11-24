"use server";

import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type GithubRepository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  html_url: string;
  fork: boolean;
  owner: { login: string };
};

// Utility to check auth
async function checkAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

// --- Projects ---

export async function getProjects() {
  await checkAuth();
  return prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getProjectById(id: string) {
  await checkAuth();
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(data: Prisma.ProjectCreateInput) {
  await checkAuth();
  
  const project = await prisma.project.create({
    data,
  });
  
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return project;
}

export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  await checkAuth();
  
  const project = await prisma.project.update({
    where: { id },
    data,
  });
  
  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  return project;
}

export async function deleteProject(id: string) {
  await checkAuth();
  
  await prisma.project.delete({
    where: { id },
  });
  
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function importGithubProjects(repos: GithubRepository[]) {
  await checkAuth();

  for (const repo of repos) {
    // Generate a slug from the repo name
    const baseSlug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    let slug = baseSlug;
    
    // Check for slug collisions and append random string if necessary
    let exists = await prisma.project.findUnique({ where: { slug } });
    let counter = 1;
    while (exists) {
      slug = `${baseSlug}-${counter}`;
      exists = await prisma.project.findUnique({ where: { slug } });
      counter++;
    }

    // Try to fetch README from GitHub
    let fullDesc = repo.description || "";
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
        headers: {
          "Accept": "application/vnd.github.v3.raw",
        },
      });
      if (readmeRes.ok) {
        fullDesc = await readmeRes.text();
      }
    } catch (e) {
      console.error(`Failed to fetch README for ${repo.name}`, e);
    }

    await prisma.project.create({
      data: {
        title: repo.name,
        slug: slug,
        shortDesc: repo.description || "Imported from GitHub",
        fullDesc: fullDesc,
        githubUrl: repo.html_url,
        tech: repo.topics || (repo.language ? [repo.language] : []),
        published: false,
        featured: false,
        order: 0,
      }
    });
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
}

// --- Site Settings ---

export async function getSettings() {
  await checkAuth();
  // We'll just grab the first one, or create it if it doesn't exist
  let settings = await prisma.siteSettings.findFirst();
  
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        title: "Portfolio",
      },
    });
  }
  
  return settings;
}

export async function updateSettings(data: Prisma.SiteSettingsCreateInput) {
  await checkAuth();
  
  const settings = await prisma.siteSettings.findFirst();
  
  if (settings) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data,
    });
  } else {
    await prisma.siteSettings.create({
      data,
    });
  }
  
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}

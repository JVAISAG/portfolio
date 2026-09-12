"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProject, updateProject } from "@/app/admin/actions";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDesc: z.string().min(1, "Short description is required"),
  fullDesc: z.string().optional(),
  imageUrl: z.string().optional(),
  tech: z.string(), // We'll split this by comma
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number(),
});

type ProjectFormValues = {
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc?: string;
  imageUrl?: string;
  tech: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
};

export default function ProjectForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          tech: initialData.tech ? initialData.tech.join(", ") : "",
          githubUrl: initialData.githubUrl || "",
          liveUrl: initialData.liveUrl || "",
          fullDesc: initialData.fullDesc || "",
          imageUrl: initialData.imageUrl || "",
        }
      : {
          title: "",
          slug: "",
          shortDesc: "",
          fullDesc: "",
          imageUrl: "",
          tech: "",
          githubUrl: "",
          liveUrl: "",
          featured: false,
          published: false,
          order: 0,
        },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const data = {
        ...values,
        tech: values.tech.split(",").map((t) => t.trim()).filter(Boolean),
        githubUrl: values.githubUrl || null,
        liveUrl: values.liveUrl || null,
        fullDesc: values.fullDesc || null,
        imageUrl: values.imageUrl || null,
      };

      if (initialData?.id) {
        await updateProject(initialData.id, data);
      } else {
        await createProject(data);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-mono">
      {error && (
        <div className="border border-error text-error p-4 bg-error/10">
          [ ERROR: {error} ]
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-secondary block">_TITLE</label>
          <input
            {...form.register("title")}
            className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
          />
          {form.formState.errors.title && (
            <p className="text-error text-sm">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-secondary block">_SLUG</label>
          <input
            {...form.register("slug")}
            className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
          />
          {form.formState.errors.slug && (
            <p className="text-error text-sm">{form.formState.errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-secondary block">_SHORT_DESC</label>
        <textarea
          {...form.register("shortDesc")}
          rows={2}
          className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
        />
        {form.formState.errors.shortDesc && (
          <p className="text-error text-sm">{form.formState.errors.shortDesc.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-secondary block">_FULL_DESC</label>
        <textarea
          {...form.register("fullDesc")}
          rows={5}
          className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-secondary block">_IMAGE_URL</label>
          <input
            {...form.register("imageUrl")}
            className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-secondary block">_TECH (comma separated)</label>
          <input
            {...form.register("tech")}
            className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-secondary block">_GITHUB_URL</label>
          <input
            {...form.register("githubUrl")}
            className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-secondary block">_LIVE_URL</label>
          <input
            {...form.register("liveUrl")}
            className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...form.register("featured")}
            className="w-4 h-4 accent-primary bg-background border-primary"
          />
          <span className="text-secondary">_FEATURED</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...form.register("published")}
            className="w-4 h-4 accent-primary bg-background border-primary"
          />
          <span className="text-secondary">_PUBLISHED</span>
        </label>
        <div className="flex items-center gap-2">
          <label className="text-secondary">_ORDER</label>
          <input
            type="number"
            {...form.register("order", { valueAsNumber: true })}
            className="w-20 bg-background border border-primary p-1 focus:outline-none focus:border-secondary text-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 border border-primary hover:inverted transition-none text-sm uppercase tracking-widest font-bold group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "[ PROCESSING... ]" : (initialData ? "[ UPDATE_PROJECT ]" : "[ CREATE_PROJECT ]")}
      </button>
    </form>
  );
}

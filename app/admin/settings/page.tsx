"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSettings, updateSettings } from "@/app/admin/actions";
import Link from "next/link";

const settingsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  profileImg: z.string().optional(),
  favicon: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  resumeUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  aboutBio: z.string().optional(),
  aboutInterests: z.string().optional(),
  aboutFocus: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: async () => {
      const data = await getSettings();
      return {
        title: data?.title || "Portfolio",
        description: data?.description || "",
        seoTitle: data?.seoTitle || "",
        seoDesc: data?.seoDesc || "",
        profileImg: data?.profileImg || "",
        favicon: data?.favicon || "",
        email: data?.email || "",
        resumeUrl: data?.resumeUrl || "",
        aboutBio: data?.aboutBio || "",
        aboutInterests: data?.aboutInterests || "",
        aboutFocus: data?.aboutFocus || "",
      };
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await updateSettings(values);
      setSuccess(true);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error && err.message ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 text-primary font-mono relative">
      <div className="max-w-4xl mx-auto border border-primary p-6 bg-background/95 relative overflow-hidden">
        <div className="mb-8 border-b border-primary border-dashed pb-4">
          <Link href="/admin" className="text-secondary hover:underline mr-4">
            &lt; BACK
          </Link>
          <h1 className="inline-block text-2xl font-bold text-shadow-glow uppercase">
            SYSTEM_SETTINGS
          </h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="border border-error text-error p-4 bg-error/10">
              [ ERROR: {error} ]
            </div>
          )}
          {success && (
            <div className="border border-primary text-primary p-4 bg-primary/10">
              [ SUCCESS: SETTINGS_UPDATED ]
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-secondary block">_SITE_TITLE</label>
              <input
                {...form.register("title")}
                className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
              />
              {form.formState.errors.title && (
                <p className="text-error text-sm">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-secondary block">_EMAIL</label>
              <input
                {...form.register("email")}
                className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-secondary block">_SITE_DESCRIPTION</label>
            <textarea
              {...form.register("description")}
              rows={2}
              className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-secondary block">_SEO_TITLE</label>
              <input
                {...form.register("seoTitle")}
                className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-secondary block">_SEO_DESC</label>
              <input
                {...form.register("seoDesc")}
                className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-secondary block">_PROFILE_IMG_URL</label>
              <input
                {...form.register("profileImg")}
                className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-secondary block">_RESUME_URL</label>
              <input
                {...form.register("resumeUrl")}
                className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
              />
            </div>
          </div>

          <div className="border-t border-primary border-dashed pt-6 mt-6">
            <h2 className="text-xl text-secondary mb-4">_ABOUT_SECTION</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-secondary block">_ABOUT_BIO</label>
                <textarea
                  {...form.register("aboutBio")}
                  rows={4}
                  className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-secondary block">_ABOUT_FOCUS</label>
                <input
                  {...form.register("aboutFocus")}
                  className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-secondary block">_ABOUT_INTERESTS</label>
                <input
                  {...form.register("aboutInterests")}
                  className="w-full bg-background border border-primary p-2 focus:outline-none focus:border-secondary text-primary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 border border-primary hover:inverted transition-none text-sm uppercase tracking-widest font-bold group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "[ PROCESSING... ]" : "[ UPDATE_SETTINGS ]"}
          </button>
        </form>
      </div>
    </div>
  );
}

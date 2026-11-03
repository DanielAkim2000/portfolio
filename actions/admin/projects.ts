"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import {
  deleteMdxFile,
  deleteMdxForAllLocales,
  readMdxFile,
  writeMdxFile,
} from "@/lib/mdx-admin";

function parseImages(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseGithubLinks(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseGithubFiles(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMakable(formData: FormData) {
  return formData.get("makable") === "on";
}

function parseRunnerLanguage(value: FormDataEntryValue | null) {
  const language = String(value ?? "c");
  return language === "cpp" ? "cpp" : "c";
}

function parseRunnerData(formData: FormData) {
  const makable = parseMakable(formData);

  return {
    makable,
    runnerLanguage: makable
      ? parseRunnerLanguage(formData.get("runnerLanguage"))
      : null,
    runnerGithubBranch: makable
      ? ((formData.get("runnerGithubBranch") as string) || "main")
      : null,
    runnerGithubFiles: makable
      ? parseGithubFiles(formData.get("runnerGithubFiles") as string)
      : [],
    runnerSampleStdin: makable
      ? ((formData.get("runnerSampleStdin") as string) || null)
      : null,
  };
}

export async function getAdminProjects() {
  await requireAuth();
  return prisma.project.findMany({
    include: { title: true, description: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminProject(id: string) {
  await requireAuth();
  const project = await prisma.project.findUnique({
    where: { id },
    include: { title: true, description: true },
  });

  if (!project) return null;

  const slug =
    project.title.find((item) => item.locale === "fr")?.title ??
    project.title[0]?.title ??
    "";

  const [mdxFr, mdxEn] = await Promise.all([
    readMdxFile("fr", "projects", slug),
    readMdxFile("en", "projects", slug),
  ]);

  return { ...project, slug, mdxFr, mdxEn };
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const link = (formData.get("link") as string) || null;
  const githubLink = parseGithubLinks(formData.get("githubLink") as string);
  const images = parseImages(formData.get("images") as string);
  const mdxFr = formData.get("mdxFr") as string;
  const mdxEn = formData.get("mdxEn") as string;

  const titleFr = formData.get("titleFr") as string;
  const titleEn = formData.get("titleEn") as string;
  const runnerData = parseRunnerData(formData);

  const project = await prisma.project.create({
    data: {
      link,
      githubLink,
      images,
      ...runnerData,
      title: {
        create: [
          {
            locale: "fr",
            title: titleFr,
            subtitle: (formData.get("subtitleFr") as string) || undefined,
          },
          {
            locale: "en",
            title: titleEn,
            subtitle: (formData.get("subtitleEn") as string) || undefined,
          },
        ],
      },
      description: {
        create: [
          {
            locale: "fr",
            content: (formData.get("descriptionFr") as string) || "",
          },
          {
            locale: "en",
            content: (formData.get("descriptionEn") as string) || "",
          },
        ],
      },
    },
  });

  await Promise.all([
    writeMdxFile("fr", "projects", titleFr, mdxFr),
    writeMdxFile("en", "projects", titleEn, mdxEn),
  ]);

  revalidateTag("projects", { expire: 0 });
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const link = (formData.get("link") as string) || null;
  const githubLink = parseGithubLinks(formData.get("githubLink") as string);
  const images = parseImages(formData.get("images") as string);
  const mdxFr = formData.get("mdxFr") as string;
  const mdxEn = formData.get("mdxEn") as string;
  const oldSlug = formData.get("oldSlug") as string;

  const titleFr = formData.get("titleFr") as string;
  const titleEn = formData.get("titleEn") as string;
  const runnerData = parseRunnerData(formData);

  await prisma.$transaction([
    prisma.project.update({
      where: { id },
      data: { link, githubLink, images, ...runnerData },
    }),
    prisma.title.updateMany({
      where: { projectId: id, locale: "fr" },
      data: {
        title: titleFr,
        subtitle: (formData.get("subtitleFr") as string) || undefined,
      },
    }),
    prisma.title.updateMany({
      where: { projectId: id, locale: "en" },
      data: {
        title: titleEn,
        subtitle: (formData.get("subtitleEn") as string) || undefined,
      },
    }),
    prisma.content.updateMany({
      where: { projectId: id, locale: "fr" },
      data: { content: (formData.get("descriptionFr") as string) || "" },
    }),
    prisma.content.updateMany({
      where: { projectId: id, locale: "en" },
      data: { content: (formData.get("descriptionEn") as string) || "" },
    }),
  ]);

  if (oldSlug && oldSlug !== titleFr) {
    await deleteMdxFile("fr", "projects", oldSlug);
  }

  await Promise.all([
    writeMdxFile("fr", "projects", titleFr, mdxFr),
    writeMdxFile("en", "projects", titleEn, mdxEn),
  ]);

  revalidateTag("projects", { expire: 0 });
  revalidateTag(`project-${id}`, { expire: 0 });
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
}

export async function deleteProject(id: string, slug: string) {
  await requireAuth();

  await prisma.project.delete({ where: { id } });
  await deleteMdxForAllLocales("projects", slug);

  revalidateTag("projects", { expire: 0 });
  revalidateTag(`project-${id}`, { expire: 0 });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

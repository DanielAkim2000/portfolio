"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import {
  deleteMdxFile,
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

  const titleEn =
    project.title.find((item) => item.locale === "en")?.title ?? slug;

  const [mdxFr, mdxEn] = await Promise.all([
    readMdxFile("fr", "projects", slug),
    readMdxFile("en", "projects", titleEn),
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

  const project = await prisma.project.create({
    data: {
      link,
      githubLink,
      images,
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

  const titleFr = formData.get("titleFr") as string;
  const titleEn = formData.get("titleEn") as string;

  const current = await prisma.title.findFirst({
    where: { projectId: id, locale: "fr" },
    select: { title: true },
  });
  const oldSlug = current?.title;

  await prisma.$transaction([
    prisma.project.update({
      where: { id },
      data: { link, githubLink, images },
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

export async function deleteProject(id: string) {
  await requireAuth();

  const titles = await prisma.title.findMany({
    where: { projectId: id },
    select: { locale: true, title: true },
  });

  // Les clés étrangères sont en SET NULL : sans ça, titres, contenus et réactions restent orphelins
  await prisma.$transaction([
    prisma.reaction.deleteMany({ where: { projectId: id } }),
    prisma.content.deleteMany({ where: { projectId: id } }),
    prisma.title.deleteMany({ where: { projectId: id } }),
    prisma.project.delete({ where: { id } }),
  ]);
  await Promise.all(
    titles.map(({ locale, title }) => deleteMdxFile(locale, "projects", title))
  );

  revalidateTag("projects", { expire: 0 });
  revalidateTag(`project-${id}`, { expire: 0 });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

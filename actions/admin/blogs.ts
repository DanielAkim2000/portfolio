"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import {
  deleteMdxForAllLocales,
  readMdxFile,
  writeMdxFile,
} from "@/lib/mdx-admin";

type LocaleFields = {
  titleFr: string;
  titleEn: string;
  subtitleFr?: string;
  subtitleEn?: string;
  descriptionFr?: string;
  descriptionEn?: string;
};

function parseImages(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getAdminBlogs() {
  await requireAuth();
  return prisma.blog.findMany({
    include: { title: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminBlog(id: string) {
  await requireAuth();
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { title: true },
  });

  if (!blog) return null;

  const [mdxFr, mdxEn] = await Promise.all([
    readMdxFile("fr", "blog", id),
    readMdxFile("en", "blog", id),
  ]);

  return { ...blog, mdxFr, mdxEn };
}

export async function createBlog(formData: FormData) {
  await requireAuth();

  const location = formData.get("location") as string;
  const pinned = formData.get("pinned") === "on";
  const images = parseImages(formData.get("images") as string);
  const mdxFr = formData.get("mdxFr") as string;
  const mdxEn = formData.get("mdxEn") as string;

  const fields: LocaleFields = {
    titleFr: formData.get("titleFr") as string,
    titleEn: formData.get("titleEn") as string,
    subtitleFr: (formData.get("subtitleFr") as string) || undefined,
    subtitleEn: (formData.get("subtitleEn") as string) || undefined,
    descriptionFr: (formData.get("descriptionFr") as string) || undefined,
    descriptionEn: (formData.get("descriptionEn") as string) || undefined,
  };

  const blog = await prisma.blog.create({
    data: {
      location,
      pinned,
      images,
      title: {
        create: [
          {
            locale: "fr",
            title: fields.titleFr,
            subtitle: fields.subtitleFr,
            description: fields.descriptionFr,
          },
          {
            locale: "en",
            title: fields.titleEn,
            subtitle: fields.subtitleEn,
            description: fields.descriptionEn,
          },
        ],
      },
    },
  });

  await Promise.all([
    writeMdxFile("fr", "blog", blog.id, mdxFr),
    writeMdxFile("en", "blog", blog.id, mdxEn),
  ]);

  revalidateTag("blogs", { expire: 0 });
  revalidatePath("/admin/blogs");
  redirect(`/admin/blogs/${blog.id}`);
}

export async function updateBlog(id: string, formData: FormData) {
  await requireAuth();

  const location = formData.get("location") as string;
  const pinned = formData.get("pinned") === "on";
  const images = parseImages(formData.get("images") as string);
  const mdxFr = formData.get("mdxFr") as string;
  const mdxEn = formData.get("mdxEn") as string;

  const fields: LocaleFields = {
    titleFr: formData.get("titleFr") as string,
    titleEn: formData.get("titleEn") as string,
    subtitleFr: (formData.get("subtitleFr") as string) || undefined,
    subtitleEn: (formData.get("subtitleEn") as string) || undefined,
    descriptionFr: (formData.get("descriptionFr") as string) || undefined,
    descriptionEn: (formData.get("descriptionEn") as string) || undefined,
  };

  await prisma.$transaction([
    prisma.blog.update({
      where: { id },
      data: { location, pinned, images },
    }),
    prisma.title.updateMany({
      where: { blogId: id, locale: "fr" },
      data: {
        title: fields.titleFr,
        subtitle: fields.subtitleFr,
        description: fields.descriptionFr,
      },
    }),
    prisma.title.updateMany({
      where: { blogId: id, locale: "en" },
      data: {
        title: fields.titleEn,
        subtitle: fields.subtitleEn,
        description: fields.descriptionEn,
      },
    }),
  ]);

  await Promise.all([
    writeMdxFile("fr", "blog", id, mdxFr),
    writeMdxFile("en", "blog", id, mdxEn),
  ]);

  revalidateTag("blogs", { expire: 0 });
  revalidateTag(`blog-${id}`, { expire: 0 });
  revalidatePath("/admin/blogs");
  revalidatePath(`/admin/blogs/${id}`);
}

export async function deleteBlog(id: string) {
  await requireAuth();

  await prisma.blog.delete({ where: { id } });
  await deleteMdxForAllLocales("blog", id);

  revalidateTag("blogs", { expire: 0 });
  revalidateTag(`blog-${id}`, { expire: 0 });
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

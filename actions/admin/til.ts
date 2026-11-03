"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function parseTags(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getAdminTils() {
  await requireAuth();
  return prisma.til.findMany({
    include: { title: true, additionalInfo: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminTil(id: string) {
  await requireAuth();
  return prisma.til.findUnique({
    where: { id },
    include: { title: true, additionalInfo: true },
  });
}

export async function createTil(formData: FormData) {
  await requireAuth();

  const tags = parseTags(formData.get("tags") as string);
  const linkDoc = (formData.get("linkDoc") as string) || null;
  const language = (formData.get("language") as string) || "ts";
  const code = formData.get("code") as string;
  const date = new Date(formData.get("date") as string);

  const til = await prisma.til.create({
    data: {
      tags,
      linkDoc,
      language,
      code,
      date,
      title: {
        create: [
          { locale: "fr", title: formData.get("titleFr") as string },
          { locale: "en", title: formData.get("titleEn") as string },
        ],
      },
      additionalInfo: {
        create: [
          {
            locale: "fr",
            content: (formData.get("additionalInfoFr") as string) || "",
          },
          {
            locale: "en",
            content: (formData.get("additionalInfoEn") as string) || "",
          },
        ],
      },
    },
  });

  revalidatePath("/admin/til");
  redirect(`/admin/til/${til.id}`);
}

export async function updateTil(id: string, formData: FormData) {
  await requireAuth();

  const tags = parseTags(formData.get("tags") as string);
  const linkDoc = (formData.get("linkDoc") as string) || null;
  const language = (formData.get("language") as string) || "ts";
  const code = formData.get("code") as string;
  const date = new Date(formData.get("date") as string);

  await prisma.$transaction([
    prisma.til.update({
      where: { id },
      data: { tags, linkDoc, language, code, date },
    }),
    prisma.title.updateMany({
      where: { tilId: id, locale: "fr" },
      data: { title: formData.get("titleFr") as string },
    }),
    prisma.title.updateMany({
      where: { tilId: id, locale: "en" },
      data: { title: formData.get("titleEn") as string },
    }),
    prisma.content.updateMany({
      where: { tilId: id, locale: "fr" },
      data: {
        content: (formData.get("additionalInfoFr") as string) || "",
      },
    }),
    prisma.content.updateMany({
      where: { tilId: id, locale: "en" },
      data: {
        content: (formData.get("additionalInfoEn") as string) || "",
      },
    }),
  ]);

  revalidatePath("/admin/til");
  revalidatePath(`/admin/til/${id}`);
}

export async function deleteTil(id: string) {
  await requireAuth();
  await prisma.til.delete({ where: { id } });
  revalidatePath("/admin/til");
  redirect("/admin/til");
}

"use server";

import prisma from "@/lib/prisma";

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        title: true,
        description: true,
        reactions: true,
      },
    });
    return project;
  } catch (error) {
    return null;
  }
}

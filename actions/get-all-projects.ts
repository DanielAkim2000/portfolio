"use server";

import prisma from "@/lib/prisma";

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        title: true,
        description: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return projects;
  } catch (error) {
    return [];
  }
}

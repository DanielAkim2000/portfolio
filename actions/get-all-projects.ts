"use server";

import prisma from "@/lib/prisma";
import { createLogger } from "@/utils/logger";

const logger = createLogger("get-all-projects");

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
    logger.error("Erreur dans get-all-projects:", error);
    return [];
  }
}

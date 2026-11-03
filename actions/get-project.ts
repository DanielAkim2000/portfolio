"use server";

import prisma from "@/lib/prisma";
import { createLogger } from "@/utils/logger";

const logger = createLogger("get-project");

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
    logger.error("Erreur dans get-project:", error);
    return null;
  }
}

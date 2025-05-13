"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { createLogger } from "@/utils/logger";

const logger = createLogger("views-project");

export async function viewsProject(id: string) {
  logger.info(`Enregistrement d'une vue pour le projet ${id}`);

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    logger.debug(`Vue enregistrée avec succès, total: ${updatedProject.views}`);

    // Revalider les données pour que les changements soient visibles
    revalidateTag(`project-${id}`);
    return {
      success: true,
      message: "Project updated",
      views: updatedProject.views,
    };
  } catch (error) {
    logger.error(`Erreur lors de l'enregistrement de la vue:`, error);
    return {
      success: false,
      message: "Error updating project",
    };
  }
}

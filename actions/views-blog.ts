"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { createLogger } from "@/utils/logger";

const logger = createLogger("views-blog");

export async function viewsBlog(id: string) {
  logger.info(`Enregistrement d'une vue pour le blog ${id}`);

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    logger.debug(`Vue enregistrée avec succès, total: ${updatedBlog.views}`);

    // Revalider les données pour que les changements soient visibles
    revalidateTag(`blog-${id}`);
    return {
      success: true,
      message: "Blog updated",
      views: updatedBlog.views,
    };
  } catch (error) {
    logger.error(`Erreur lors de l'enregistrement de la vue:`, error);
    return {
      success: false,
      message: "Error updating blog",
    };
  }
}

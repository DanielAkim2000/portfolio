"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function viewsProject(id: string) {
  console.log(`[views-project] Enregistrement d'une vue pour le projet ${id}`);

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    console.log(
      `[views-project] Vue enregistrée avec succès, total: ${updatedProject.views}`
    );

    // Revalider les données pour que les changements soient visibles
    revalidateTag(`project-${id}`);
    return {
      success: true,
      message: "Project updated",
      views: updatedProject.views,
    };
  } catch (error) {
    console.error(
      `[views-project] Erreur lors de l'enregistrement de la vue:`,
      error
    );
    return {
      success: false,
      message: "Error updating project",
    };
  }
}

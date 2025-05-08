"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function viewsBlog(id: string) {
  console.log(`[views-blog] Enregistrement d'une vue pour le blog ${id}`);

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    console.log(
      `[views-blog] Vue enregistrée avec succès, total: ${updatedBlog.views}`
    );

    // Revalider les données pour que les changements soient visibles
    revalidateTag(`blog-${id}`);
    return {
      success: true,
      message: "Blog updated",
      views: updatedBlog.views,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating blog",
    };
  }
}

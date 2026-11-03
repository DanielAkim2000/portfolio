"use server";

import prisma from "@/lib/prisma";
import { createLogger } from "@/utils/logger";

const logger = createLogger("share-blog");
import { revalidateTag } from "next/cache";
export async function shareBlog(blogId: string) {
  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        nbShares: { increment: 1 },
      },
    });

    revalidateTag(`blog-${blogId}`, "max");
    return { message: "Blog shared" };
  } catch (error) {
    logger.error("Erreur dans share-blog:", error);
    throw new Error("Error sharing blog");
  }
}

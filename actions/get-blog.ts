"use server";

import prisma from "@/lib/prisma";
import { createLogger } from "@/utils/logger";

const logger = createLogger("get-blog");

export const getBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        title: true,
        reactions: true,
      },
    });
    return blog;
  } catch (error) {
    logger.error("Erreur dans get-blog:", error);
    return null;
  }
};

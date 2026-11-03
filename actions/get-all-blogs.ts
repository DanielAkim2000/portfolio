"use server";

import prisma from "@/lib/prisma";
import { createLogger } from "@/utils/logger";

const logger = createLogger("get-all-blogs");

export const getAllBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        title: true,
        reactions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const pinnedBlogs = blogs.filter((blog) => blog.pinned);
    const otherBlogs = blogs.filter((blog) => !blog.pinned);

    return [...pinnedBlogs, ...otherBlogs];
  } catch (error) {
    logger.error("Erreur dans get-all-blogs:", error);
    return [];
  }
};

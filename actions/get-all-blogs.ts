"use server";

import prisma from "@/lib/prisma";

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
    return [];
  }
};

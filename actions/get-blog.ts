"use server";

import prisma from "@/lib/prisma";

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
    return null;
  }
};

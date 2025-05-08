"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
export async function shareBlog(blogId: string) {
  try {
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        nbShares: { increment: 1 },
      },
    });

    revalidateTag(`blog-${blogId}`);
    return { message: "Blog shared" };
  } catch (error) {
    throw new Error("Error sharing blog");
  }
}

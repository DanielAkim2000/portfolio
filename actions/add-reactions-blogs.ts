"use server";

import prisma from "@/lib/prisma";
import { Prisma, ReactionType } from "@/prisma/generated";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addReactionBlog(
  blogId: string,
  reactionType: ReactionType
) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    if (!sessionId) {
      return { message: "No session ID found" };
    }
    await prisma.reaction.create({
      data: {
        type: reactionType,
        sessionId: sessionId,
        Blog: {
          connect: {
            id: blogId,
          },
        },
      },
    });
    revalidateTag(`blog-${blogId}`);
    return { message: "reaction_added" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "reaction_already_exists" };
      }
    }
    throw new Error("error_add_reaction");
  }
}

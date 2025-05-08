"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function shareProject(projectId: string) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        nbShares: { increment: 1 },
      },
    });
    revalidateTag(`project-${projectId}`);
    return { message: "Project shared" };
  } catch (error) {
    throw new Error("Error sharing project");
  }
}

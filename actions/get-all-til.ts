"use server";

import prisma from "@/lib/prisma";

export async function getAllTil() {
  try {
    const til = await prisma.til.findMany({
      include: {
        title: true,
        additionalInfo: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return til;
  } catch (error) {
    return [];
  }
}

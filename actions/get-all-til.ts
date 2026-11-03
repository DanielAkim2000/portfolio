"use server";

import prisma from "@/lib/prisma";
import { createLogger } from "@/utils/logger";

const logger = createLogger("get-all-til");

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
    logger.error("Erreur dans get-all-til:", error);
    return [];
  }
}

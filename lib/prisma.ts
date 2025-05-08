// Eviter d avoir plusieurs instances de prisma
import { PrismaClient } from "@/prisma/generated";

const prisma = new PrismaClient();

export default prisma;

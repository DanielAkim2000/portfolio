/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionId,type,blogId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Translation";

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_sessionId_type_blogId_key" ON "Reaction"("sessionId", "type", "blogId");

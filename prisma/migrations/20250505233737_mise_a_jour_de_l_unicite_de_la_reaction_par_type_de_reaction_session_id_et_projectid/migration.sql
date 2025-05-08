/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,type,projectId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reaction_sessionId_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_sessionId_type_projectId_key" ON "Reaction"("sessionId", "type", "projectId");

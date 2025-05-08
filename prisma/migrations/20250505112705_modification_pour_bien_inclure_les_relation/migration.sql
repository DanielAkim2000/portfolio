/*
  Warnings:

  - You are about to drop the `_ProjectToTitle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTitle" DROP CONSTRAINT "_ProjectToTitle_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTitle" DROP CONSTRAINT "_ProjectToTitle_B_fkey";

-- DropTable
DROP TABLE "_ProjectToTitle";

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

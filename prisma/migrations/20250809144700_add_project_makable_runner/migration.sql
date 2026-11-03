-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "makable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "runnerLanguage" TEXT,
ADD COLUMN     "runnerGithubBranch" TEXT DEFAULT 'main',
ADD COLUMN     "runnerGithubFiles" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "runnerSampleStdin" TEXT;

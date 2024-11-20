-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "fk_lesson";

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "assignments" SET DATA TYPE JSONB;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "assignments" SET DATA TYPE JSONB;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "content" SET DATA TYPE JSONB;

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_like_per_user" ON "Like"("lessonId", "userId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "fk_lesson" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

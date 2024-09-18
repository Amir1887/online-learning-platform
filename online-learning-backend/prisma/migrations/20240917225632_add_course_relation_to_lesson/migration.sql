/*
  Warnings:

  - You are about to drop the column `content` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `attachments` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videourl` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "Lesson" DROP COLUMN "content",
-- ADD COLUMN     "attachmentpath" TEXT,
-- ADD COLUMN     "attachments" JSONB NOT NULL,
-- ADD COLUMN     "description" TEXT NOT NULL,
-- ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
-- ADD COLUMN     "videopath" TEXT,
-- ADD COLUMN     "videourl" TEXT NOT NULL;


ALTER TABLE "Lesson"
ADD COLUMN "attachmentpath" TEXT,
ADD COLUMN "attachments" JSONB,
ADD COLUMN "description" TEXT,
ADD COLUMN "updatedAt" TIMESTAMP(3),
ADD COLUMN "videopath" TEXT,
ADD COLUMN "videourl" TEXT;

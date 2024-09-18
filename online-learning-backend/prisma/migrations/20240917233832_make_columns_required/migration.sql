/*
  Warnings:

  - You are about to drop the column `description` on the `Lesson` table. All the data in the column will be lost.
  - Made the column `attachments` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videourl` on table `Lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "description",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "attachments" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "videourl" SET NOT NULL;

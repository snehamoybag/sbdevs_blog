/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `BlogImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicId` to the `BlogImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogImage" ADD COLUMN     "publicId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BlogImage_publicId_key" ON "BlogImage"("publicId");

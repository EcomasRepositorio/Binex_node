/*
  Warnings:

  - You are about to drop the column `pdf` on the `Student` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "pdf",
ADD COLUMN     "imageCertificate" TEXT;

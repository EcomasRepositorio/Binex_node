/*
  Warnings:

  - Made the column `hour` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "hour" SET NOT NULL,
ALTER COLUMN "hour" SET DATA TYPE TEXT,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

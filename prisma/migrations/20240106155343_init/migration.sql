/*
  Warnings:

  - Changed the type of `DNI` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "DNI",
ADD COLUMN     "DNI" INTEGER NOT NULL;

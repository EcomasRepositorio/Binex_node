/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");

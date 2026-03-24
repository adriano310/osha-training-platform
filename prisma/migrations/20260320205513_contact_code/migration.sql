/*
  Warnings:

  - A unique constraint covering the columns `[contactCode]` on the table `ContactSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN "contactCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ContactSubmission_contactCode_key" ON "ContactSubmission"("contactCode");

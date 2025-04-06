/*
  Warnings:

  - Made the column `grupoId` on table `Atividade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Atividade" ALTER COLUMN "dueDate" SET DATA TYPE TEXT,
ALTER COLUMN "grupoId" SET NOT NULL;

/*
  Warnings:

  - Made the column `status` on table `Atividade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Atividade" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'NAO_INICIADA';

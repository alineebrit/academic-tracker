/*
  Warnings:

  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Aluno` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Atividade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Atividade` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Grupo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Grupo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Professor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Turma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Turma` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `grupoId` on the `Aluno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grupoId` on the `Atividade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grupoId` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `turmaId` on the `Grupo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `professorId` on the `Turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Grupo" DROP CONSTRAINT "Grupo_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_professorId_fkey";

-- AlterTable
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "grupoId",
ADD COLUMN     "grupoId" INTEGER NOT NULL,
ADD CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "grupoId",
ADD COLUMN     "grupoId" INTEGER NOT NULL,
ADD CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "grupoId",
ADD COLUMN     "grupoId" INTEGER NOT NULL,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Grupo" DROP CONSTRAINT "Grupo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "turmaId",
ADD COLUMN     "turmaId" INTEGER NOT NULL,
ADD CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Professor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "professorId",
ADD COLUMN     "professorId" INTEGER NOT NULL,
ADD CONSTRAINT "Turma_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

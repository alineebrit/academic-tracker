/*
  Warnings:

  - You are about to drop the column `grupoId` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Turma` table. All the data in the column will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Turma` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'PROFESSOR', 'ALUNO');

-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_professorId_fkey";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "grupoId";

-- AlterTable
ALTER TABLE "Turma" DROP COLUMN "professorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "grupoId" INTEGER,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Professor";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

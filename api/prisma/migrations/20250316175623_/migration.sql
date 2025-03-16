-- CreateEnum
CREATE TYPE "atividadeStatus" AS ENUM ('NAO_INICIADA', 'EM_PROCESSO', 'AGUARDANDO_CORRECAO', 'FINALIZADA');

-- AlterTable
ALTER TABLE "Atividade" ADD COLUMN     "status" "atividadeStatus";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

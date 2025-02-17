import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Note {
  id?: number;
  titulo: string;
  conteudo: string;
  createdAt?: Date;
}

export default prisma.note;

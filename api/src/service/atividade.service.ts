import { PrismaClient } from "@prisma/client";
import { Atividade } from "../models/user";

const prisma = new PrismaClient();

class AtividadeService {
    async create(data: Atividade) {
        return await prisma.atividade.create({ data });
    }

    async getAll() {
        return await prisma.atividade.findMany();
    }

    async getById(id: number) {
        return await prisma.atividade.findUnique({ where: { id } });
    }

    async update(
        id: number,
        data: Partial<{ title: string; description: string; dueDate: Date }>
    ) {
        return await prisma.atividade.update({ where: { id }, data });
    }

    async delete(id: number) {
        return await prisma.atividade.delete({ where: { id } });
    }
}

export default new AtividadeService();

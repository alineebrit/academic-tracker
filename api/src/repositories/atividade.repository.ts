import { PrismaClient } from "@prisma/client";
import { Atividade } from "../models/atividade";
export class AtividadeRepository {
    atividadeClient = new PrismaClient().atividade;

    constructor() {
        this.atividadeClient = new PrismaClient().atividade;
    }

    createAtividade = async (data: Atividade) => {
        return await this.atividadeClient.create({ data });
    };

    
    async getAllAtividade() {
        return this.atividadeClient.findMany();
    }

    async getAllAtividadePaginated(
        page: number,
        limit: number,
        sortBy: string,
        order: 'asc' | 'desc'
    ) {
        const skip = (page - 1) * limit;
        
        return this.atividadeClient.findMany({
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
            }
        });
    }

    async countAtividades() {
        return this.atividadeClient.count();
    }

    getByIdAtividade = async (id: number) => {
        return await this.atividadeClient.findUnique({ where: { id } });
    };

    updateAtividade = async (
        atividadeId: number,
        data: Partial<{ title: string; description: string; dueDate: Date }>
    ) => {
        return await this.atividadeClient.update({
            where: { id: atividadeId },
            data,
        });
    };

    deleteAtividade = async (id: number) => {
        return await this.atividadeClient.delete({ where: { id } });
    };
}

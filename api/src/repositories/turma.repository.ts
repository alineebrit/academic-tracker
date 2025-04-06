import { PrismaClient } from '@prisma/client';
import { Turma } from '../models/turma';

export class TurmaRepository {
    turmaClient = new PrismaClient().turma;

    constructor() {
        this.turmaClient = new PrismaClient().turma;
    }

    createTurma = async (data: Turma) => {
        return await this.turmaClient.create({ data });
    };

    getAllTurma = async () => {
        return await this.turmaClient.findMany();
    };

    async findAllPaginado(
        page: number,
        limit: number,
        sortBy: string,
        order: 'asc' | 'desc'
    ) {
        const skip = (page - 1) * limit;

        return this.turmaClient.findMany({
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
        });
    }

    async countTurmas() {
        return this.turmaClient.count();
    }

    getByIdTurma = async (id: number) => {
        return await this.turmaClient.findUnique({ where: { id } });
    };

    updateTurma = async (turmaId: number, data: Turma) => {
        return await this.turmaClient.update({
            where: { id: turmaId },
            data,
        });
    };

    deleteTurma = async (id: number) => {
        return await this.turmaClient.delete({ where: { id } });
    };
}

import { PrismaClient } from "@prisma/client";
import { Turma } from "../models/turma";

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

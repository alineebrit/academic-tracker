import { PrismaClient } from "@prisma/client";
import { Atividade } from "../models/user";

const atividadeClient = new PrismaClient().atividade;

export const createAtividade = async (data: Atividade) => {
    return await atividadeClient.create({ data });
};

export const getAllAtividade = async () => {
    return await atividadeClient.findMany();
};

export const getByIdAtividade = async (id: number) => {
    return await atividadeClient.findUnique({ where: { id } });
};

export const updateAtividade = async (
    atividadeId: number,
    data: Partial<{ title: string; description: string; dueDate: Date }>
) => {
    return await atividadeClient.update({ where: { id: atividadeId }, data });
};

export const deleteAtividade = async (id: number) => {
    return await atividadeClient.delete({ where: { id } });
};

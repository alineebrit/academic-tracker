import { PrismaClient, Prisma } from "@prisma/client";
import { Grupo } from "@prisma/client";

export class GrupoRepository {
    grupoClient = new PrismaClient().grupo;

    constructor() {
        this.grupoClient = new PrismaClient().grupo;
    }

    createGrupo = async (data: Grupo) => {
            return await this.grupoClient.create({ data });
        };

    async findAll() {
        return await this.grupoClient.findMany();
    }

    async findById(id: number) {
        return await this.grupoClient.findUnique({ where: { id } });
    }

    async update(id: number, data: Prisma.GrupoUpdateInput) {
        return await this.grupoClient.update({ where: { id }, data });
    }

    async delete(id: number) {
        return await this.grupoClient.delete({ where: { id } });
    }
}

import { PrismaClient, Prisma, Grupo } from "@prisma/client";

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
     
     async findAllPaginado(
        page: number,
        limit: number,
        sortBy: string,
        order: 'asc' | 'desc'
    ) {
        const skip = (page - 1) * limit;
        
        return this.grupoClient.findMany({
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
            }
        });
    }


    async countGrupos() {
        return this.grupoClient.count();
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

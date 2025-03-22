import { PrismaClient } from "@prisma/client";
import { Note } from "../models/note";

export class NoteRepository {
    noteClient = new PrismaClient().note;

    constructor() {
        this.noteClient = new PrismaClient().note;
    }
    createNote = async (data: Note) => {
        return await this.noteClient.create({ data });
    };

    async findAll() {
        return await this.noteClient.findMany();
    }

    async findAllPaginado(
        page: number,
        limit: number,
        sortBy: string,
        order: 'asc' | 'desc'
    ) {
        const skip = (page - 1) * limit;
        
        return this.noteClient.findMany({
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
            }
        });
    }

        // Novo método para contar o total de Notes
    async countNotes() {
        return this.noteClient.count();
    }

    async findById(id: number) {
        return await this.noteClient.findUnique({ where: { id } });
    }

    async update(id: number, note: Note) {
        return await this.noteClient.update({ where: { id }, data: note });
    }

    async delete(id: number) {
        return await this.noteClient.delete({ where: { id } });
    }
}

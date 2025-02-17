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

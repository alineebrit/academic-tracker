import { PrismaClient } from "@prisma/client";
import { Note } from "../models/note";

const prisma = new PrismaClient();

export class NoteRepository {
  async create(note: Note): Promise<Note> {
    return await prisma.note.create({ data: note });
  }

  async findAll(): Promise<Note[]> {
    return await prisma.note.findMany();
  }

  async findById(id: number): Promise<Note | null> {
    return await prisma.note.findUnique({ where: { id } });
  }

  async update(id: number, note: Note): Promise<Note | null> {
    return await prisma.note.update({ where: { id }, data: note });
  }

  async delete(id: number): Promise<Note | null> {
    return await prisma.note.delete({ where: { id } });
  }
}

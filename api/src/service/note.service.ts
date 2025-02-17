import { NoteRepository } from "../repositories/note.repository";
import { Note } from "../models/note";

export class NoteService {
    private noteRepository = new NoteRepository();

    async createNote(note: Note) {
        return await this.noteRepository.createNote(note);
    }

    async getAllNotes() {
        return await this.noteRepository.findAll();
    }

    async getNoteById(id: number) {
        return await this.noteRepository.findById(id);
    }

    async updateNote(id: number, note: Note) {
        return await this.noteRepository.update(id, note);
    }

    async deleteNote(id: number) {
        return await this.noteRepository.delete(id);
    }
}

import { NoteRepository } from "../repositories/note.repository";
import { Note } from "../models/note";

export class NoteService {
  private noteRepository = new NoteRepository();

  async createNote(note: Note): Promise<Note> {
    return await this.noteRepository.create(note);
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepository.findAll();
  }

  async getNoteById(id: number): Promise<Note | null> {
    return await this.noteRepository.findById(id);
  }

  async updateNote(id: number, note: Note): Promise<Note | null> {
    return await this.noteRepository.update(id, note);
  }

  async deleteNote(id: number): Promise<Note | null> {
    return await this.noteRepository.delete(id);
  }
}

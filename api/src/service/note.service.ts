import { NoteRepository } from "../repositories/note.repository";
import { Note } from "../models/note";


interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

interface PaginatedResult<T> {
    data: T[];
    meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export class NoteService {
    private readonly noteRepository = new NoteRepository();

    async createNote(note: Note) {
        return await this.noteRepository.createNote(note);
    }

    async getAllNotes() {
        return await this.noteRepository.findAll();
    }
  
getAllNotesPaginado = async (params: PaginationParams = {}): Promise<PaginatedResult<Note>> => {
              // Valores padrão para paginação
              const page = params.page || 1;
              const limit = params.limit || 10;
              const sortBy = params.sortBy || 'dueDate';
              const order = params.order || 'asc';
              
              // Obter dados paginados e contagem total do repositório
              const [notes, totalItems] = await Promise.all([
                  this.noteRepository.findAllPaginado(page, limit, sortBy, order),
                  this.noteRepository.countNotes()
              ]);
              
              // Calcular metadados de paginação
              const totalPages = Math.ceil(totalItems / limit);
              
              // Retornar resultado formatado
              return {
                  data: notes,
                  meta: {
                      currentPage: page,
                      itemsPerPage: limit,
                      totalItems,
                      totalPages,
                      hasNextPage: page < totalPages,
                      hasPrevPage: page > 1
                  }
              };
          };
    

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

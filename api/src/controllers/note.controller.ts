/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { NoteService } from '../service/note.service';
import { Note } from '../models/note';

export class NoteController {
    private readonly noteService: NoteService;

    constructor() {
        this.noteService = new NoteService();
    }

    createNote = async (req: Request, res: Response) => {
        try {
            const noteData: Note = req.body;
            const titulo = noteData.title;

            if (!titulo) {
                res.status(404).json({
                    error: 'Título da nota não preenchido',
                });
                return;
            }

            const note = await this.noteService.createNote(noteData);
            res.status(201).json({ data: note });
            return;
        } catch (error) {
            res.status(500).json({
                error: 'Não foi possível criar a nota',
                message: error,
            });
            return;
        }
    };

    updateNote = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const noteData: Note = req.body;

            const updatedNote = await this.noteService.updateNote(
                Number(id),
                noteData
            );

            if (!updatedNote) {
                res.status(500).json({
                    error: `Nota de ID ${id} não encontrada`,
                });
                return;
            }

            res.status(200).json({ data: updatedNote });
            return;
        } catch (error) {
            res.status(500).json({
                error: 'Não foi possível atualizar a nota',
            });
            return;
        }
    };

    getAllNotes = async (req: Request, res: Response) => {
        try {
            const notes = await this.noteService.getAllNotes();
            res.status(200).json({ data: notes });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao buscar as notas',
            });
        }
    };

    getAllNotesPaginado = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || 'dueDate';
            const order = (req.query.order as 'asc' | 'desc') || 'asc';

            const notes = await this.noteService.getAllNotesPaginado({
                page,
                limit,
                sortBy,
                order,
            });

            res.status(200).json({ data: notes });
        } catch (error) {
            console.error('Erro ao buscar notes:', error);
            res.status(500).json({ error: 'Erro ao buscar notes' });
        }
    };

    getNoteById = async (req: Request, res: Response) => {
        try {
            const noteId = parseInt(req.params.id, 10);
            const note = await this.noteService.getNoteById(noteId);

            if (!note) {
                res.status(500).json({
                    error: `Nota de ID ${req.params.id} não encontrada`,
                });
                return;
            }

            res.status(200).json({ data: note });
        } catch (error) {
            res.status(500).json({
                error: `Erro ao buscar a nota de ID ${req.params.id}`,
            });
        }
    };

    deleteNote = async (req: Request, res: Response) => {
        try {
            const noteId = parseInt(req.params.id, 10);
            const deletedNote = await this.noteService.deleteNote(noteId);

            if (!deletedNote) {
                res.status(404).json({
                    error: `Nota de ID ${req.params.id} não encontrada`,
                });
                return;
            }

            res.status(204).json({ message: 'Note deletada com sucesso' });
            return;
        } catch (error) {
            res.status(500).json({
                error: `Erro ao excluir a nota de ID ${req.params.id}`,
            });
            return;
        }
    };
}

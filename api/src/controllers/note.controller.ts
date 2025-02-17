/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { NoteService } from "../service/note.service";
import { Note } from "../models/note";

export class NoteController {
    private noteService: NoteService;

    constructor() {
        this.noteService = new NoteService();
    }

    createNote = async (req: Request, res: Response) => {
        try {
            const noteData: Note = req.body;
            const titulo = noteData.titulo;

            if (!titulo) {
                return res.status(400).json({
                    error: "Título da nota não preenchido",
                });
            }

            const note = await this.noteService.createNote(noteData);
            res.status(201).json({ data: note });
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível criar a nota",
            });
        }
    };

    updateNote = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const noteData: Note = req.body;

            const updatedNote = await this.noteService.updateNote(Number(id), noteData);

            if (!updatedNote) {
                return res.status(404).json({
                    error: `Nota de ID ${id} não encontrada`,
                });
            }

            res.status(200).json({ data: updatedNote });
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível atualizar a nota",
            });
        }
    };

    getAllNotes = async (req: Request, res: Response) => {
        try {
            const notes = await this.noteService.getAllNotes();
            res.status(200).json({ data: notes });
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar as notas",
            });
        }
    };

    getNoteById = async (req: Request, res: Response) => {
        try {
            const noteId = parseInt(req.params.id, 10);
            const note = await this.noteService.getNoteById(noteId);

            if (!note) {
                return res.status(404).json({
                    error: `Nota de ID ${req.params.id} não encontrada`,
                });
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
                return res.status(404).json({
                    error: `Nota de ID ${req.params.id} não encontrada`,
                });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: `Erro ao excluir a nota de ID ${req.params.id}`,
            });
        }
    };
}

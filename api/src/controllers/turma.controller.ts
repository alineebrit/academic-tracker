/* eslint-disable @typescript-eslint/no-unused-vars */
import { Turma } from "@prisma/client";
import { Request, Response } from "express";
import { TurmaService } from "../service/turma.service";

export class TurmaController {
    private readonly turmaService: TurmaService;

    constructor() {
        this.turmaService = new TurmaService();
    }

    createTurma = async (req: Request, res: Response) => {
        try {
            const { name, userId }: Turma = req.body;

            if (!name || !userId) {
                res.status(401).json({
                    error: "Campo obrigatório não preenchido",
                });
            }

            const turma = await this.turmaService.createTurma(req.body);
            res.status(201).json({ data: turma });
        } catch (error) {
            if (error instanceof Error)
                if (
                    error.message ===
                    "Usuário do tipo ALUNO não pode criar uma turma"
                ) {
                    res.status(400).json({ error: error.message });
                    return;
                }
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
    };

    updateTurma = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const TurmaData = req.body;

            const Turma = await this.turmaService.updateTurma(
                Number(id),
                TurmaData
            );
            res.status(200).json({ data: Turma });
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível atualizar a Turma",
            });
        }
    };

    getAllTurmas = async (req: Request, res: Response) => {
        try {
            const getAll = await this.turmaService.getAllTurmas();

            res.status(200).json({ data: getAll });
        } catch (error) {
            res.status(500).json({
                error: "Error ao utilizar o getAllTurmas",
            });
        }
    };

    getTurmaById = async (req: Request, res: Response) => {
        try {
            const TurmaId = parseInt(req.params.id, 10);
            const Turma = await this.turmaService.getTurmaById(TurmaId);

            res.status(200).json({ data: Turma });
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar a Turma de id ${req.params.id}`,
            });
        }
    };
    deleteTurma = async (req: Request, res: Response) => {
        try {
            const TurmaId = parseInt(req.params.id, 10);
            const Turma = await this.turmaService.deleteTurma(TurmaId);

            res.status(204).json({ data: Turma });
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar a Turma de id ${req.params.id}`,
            });
        }
    };
}

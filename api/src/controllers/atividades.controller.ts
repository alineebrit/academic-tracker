/* eslint-disable @typescript-eslint/no-unused-vars */
import { Atividade } from "./../models/atividade";
import { Request, Response } from "express";
import { AtividadeService } from "../service/atividade.service";

export class AtividadeController {
    private readonly atividadeService: AtividadeService;

    constructor() {
        this.atividadeService = new AtividadeService();
    }

    createAtividade = async (req: Request, res: Response) => {
        try {
            const atividadeData: Atividade = req.body;
            const title = atividadeData.title;

            if (!title) {
                res.status(401).json({
                    error: "Título da atividade não preenchido",
                });
            }

            const atividade =
                await this.atividadeService.createAtividade(atividadeData);
            res.status(201).json({ data: atividade });
            return;
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível criar a atividade",
            });
            return;
        }
    };

    updateAtividade = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const atividadeData = req.body;

            const atividade = await this.atividadeService.updateAtividade(
                Number(id),
                atividadeData
            );
            res.status(200).json({ data: atividade });
            return;
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível atualizar a atividade",
            });
            return;
        }
    };

    getAllAtividades = async (req: Request, res: Response) => {
        try {
            const getAll = await this.atividadeService.getAllAtividade();

            res.status(200).json({ data: getAll });
            return;
        } catch (error) {
            res.status(500).json({
                error: "Error ao utilizar o getAllAtividades",
            });
            return;
        }
    };

    getAtividadeById = async (req: Request, res: Response) => {
        try {
            const atividadeId = parseInt(req.params.id, 10);
            const atividade =
                await this.atividadeService.getAtividadeById(atividadeId);

            res.status(200).json({ data: atividade });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar a atividade de id ${req.params.id}`,
            });
            return;
        }
    };
    deleteAtividade = async (req: Request, res: Response) => {
        try {
            const atividadeId = parseInt(req.params.id, 10);
            const atividade =
                await this.atividadeService.deleteAtividade(atividadeId);

            res.status(204).json({ data: atividade });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar a atividade de id ${req.params.id}`,
            });
            return;
        }
    };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import atividadeService from "../service/atividade.service";

class AtividadeController {
    async create(req: Request, res: Response) {
        console.log("req", req);
        console.log("res", res);
        try {
            const atividade = await atividadeService.create(req.body);
            res.status(201).json(atividade);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar atividade" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const atividades = await atividadeService.getAll();
            res.json(atividades);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar atividades" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const atividade = await atividadeService.getById(
                parseInt(req.params.id, 10)
            );
            if (!atividade) {
                return res
                    .status(404)
                    .json({ error: "Atividade não encontrada" });
            }
            res.json(atividade);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar atividade" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const atividade = await atividadeService.update(
                parseInt(req.params.id, 10),
                req.body
            );
            res.json(atividade);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar atividade" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await atividadeService.delete(parseInt(req.params.id, 10));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar atividade" });
        }
    }
}

export default new AtividadeController();

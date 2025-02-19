/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { GrupoService } from "../service/grupo.service";
import { Grupo } from "../models/grupo";

export class GrupoController {
    private grupoService: GrupoService;

    constructor() {
        this.grupoService = new GrupoService();
    }

    createGrupo = async (req: Request, res: Response) => {
        try {
            const grupoData: Grupo = req.body;
            const nome = grupoData.name;

            if (!nome) {
                res.status(400).json({
                    error: "Nome do grupo não preenchido",
                });
                return;
            }

            const grupo = await this.grupoService.createGrupo(grupoData);
            res.status(201).json({ data: grupo });
            return;
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível criar o grupo",
            });
            return;
        }
    };

    updateGrupo = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const grupoData: Grupo = req.body;

            const updatedGrupo = await this.grupoService.updateGrupo(
                Number(id),
                grupoData
            );

            if (!updatedGrupo) {
                res.status(404).json({
                    error: `Grupo de ID ${id} não encontrado`,
                });
                return;
            }

            res.status(200).json({ data: updatedGrupo });
            return;
        } catch (error) {
            res.status(500).json({
                error: "Não foi possível atualizar o grupo",
            });
            return;
        }
    };

    getAllGrupos = async (req: Request, res: Response) => {
        try {
            const grupos = await this.grupoService.getAllGrupos();
            res.status(200).json({ data: grupos });
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar os grupos",
            });
        }
    };

    getGrupoById = async (req: Request, res: Response) => {
        try {
            const grupoId = parseInt(req.params.id, 10);
            const grupo = await this.grupoService.getGrupoById(grupoId);

            if (!grupo) {
                res.status(404).json({
                    error: `Grupo de ID ${req.params.id} não encontrado`,
                });
                return;
            }

            res.status(200).json({ data: grupo });
        } catch (error) {
            res.status(500).json({
                error: `Erro ao buscar o grupo de ID ${req.params.id}`,
            });
        }
    };

    deleteGrupo = async (req: Request, res: Response) => {
        try {
            const grupoId = parseInt(req.params.id, 10);
            const deletedGrupo = await this.grupoService.deleteGrupo(grupoId);

            if (!deletedGrupo) {
                res.status(404).json({
                    error: `Grupo de ID ${req.params.id} não encontrado`,
                });
                return;
            }

            res.status(204).json({ message: "Grupo deletado com sucesso" });
            return;
        } catch (error) {
            res.status(500).json({
                error: `Erro ao excluir o grupo de ID ${req.params.id}`,
            });
            return;
        }
    };
}

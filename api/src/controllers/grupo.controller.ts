/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { GrupoService } from '../service/grupo.service';
import { Grupo } from '@prisma/client';
import { TurmaService } from '../service/turma.service';

export class GrupoController {
    private readonly grupoService: GrupoService;
    private readonly turmaService: TurmaService;

    constructor() {
        this.grupoService = new GrupoService();
        this.turmaService = new TurmaService();
    }

    createGrupo = async (req: Request, res: Response) => {
        try {
            const grupoData: Grupo = req.body;
            const name = grupoData.name;

            if (!name || !grupoData.turmaId) {
                res.status(401).json({
                    error: 'Campo obrigatório não preenchido',
                });
                return;
            }

            if (grupoData.turmaId) {
                const turmaValid = await this.turmaService.getTurmaById(
                    grupoData.turmaId
                );
                if (!turmaValid) {
                    res.status(404).json({ error: 'Turma não existe' });
                    return;
                }
            }

            const grupo = await this.grupoService.createGrupo(grupoData);

            res.status(201).json({ data: grupo });
            return;
        } catch (error) {
            res.status(500).json({
                error: 'Não foi possível criar o grupo',
                message: error,
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
                error: 'Não foi possível atualizar o grupo',
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
                error: 'Erro ao buscar os grupos',
            });
        }
    };

    getAllGruposPaginado = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || 'dueDate';
            const order = (req.query.order as 'asc' | 'desc') || 'asc';

            const grupos = await this.grupoService.getAllGruposPaginado({
                page,
                limit,
                sortBy,
                order,
            });

            res.status(200).json({ data: grupos });
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
            res.status(500).json({ error: 'Erro ao buscar grupos' });
        }
    };

    getGrupoById = async (req: Request, res: Response) => {
        try {
            const grupoId = parseInt(req.params.id, 10);
            const grupo = await this.grupoService.getGrupoById(grupoId);

            if (!grupo) {
                res.status(500).json({
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

            res.status(204).json({ message: 'Grupo deletado com sucesso' });
            return;
        } catch (error) {
            res.status(500).json({
                error: `Erro ao excluir o grupo de ID ${req.params.id}`,
            });
            return;
        }
    };

    getGruposByTurmaId = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const intId = parseInt(id);
            if (!id) {
                res.status(404).json({
                    message: 'Id obrigatório!',
                });
                return;
            }

            const turma = await this.turmaService.getTurmaById(intId);

            if (!turma) {
                res.status(404).json({
                    message: 'Turma não existe!',
                });
                return;
            }
            const grupos = await this.grupoService.getGruposByTurmaId(intId);

            res.status(200).json({
                data: grupos,
            });
            return;
        } catch (error) {
            console.error('Erro ao buscar grupos por turma:', error);
            res.status(500).json({
                message: 'Erro interno ao buscar grupos da turma.',
            });
            return;
        }
    };
}

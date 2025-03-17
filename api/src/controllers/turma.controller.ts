/* eslint-disable @typescript-eslint/no-unused-vars */
import { $Enums, Turma } from '@prisma/client';
import { Request, Response } from 'express';
import { TurmaService } from '../service/turma.service';
import { UserService } from '../service/user.service';

export class TurmaController {
    private readonly turmaService: TurmaService;
    private readonly userService: UserService;

    constructor() {
        this.turmaService = new TurmaService();
        this.userService = new UserService();
    }

    createTurma = async (req: Request, res: Response) => {
        try {
            const { name, userId }: Turma = req.body;

            if (!name || !userId) {
                res.status(401).json({
                    error: 'Campo obrigatório não preenchido',
                });
            }

            const user = await this.userService.getUserById(userId);

            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado!' });
                return;
            }

            if (await this.userService.isAdminOrProfessor(userId)) {
                res.status(403).json({
                    error: 'Apenas permitido para PROFESSORES ou ADMIN',
                });
                return;
            }

            const turma = await this.turmaService.createTurma(req.body);
            res.status(201).json({ data: turma });
        } catch (error) {
            if (error instanceof Error)
                if (
                    error.message ===
                    'Usuário do tipo ALUNO não pode criar uma turma'
                ) {
                    res.status(400).json({ error: error.message });
                    return;
                }
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
    };

    updateTurma = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const turmaData = req.body;

            const Turma = await this.turmaService.updateTurma(
                Number(id),
                turmaData
            );

            // if (await this.userService.isAdminOrProfessor(turmaData.userId)) {
            //     res.status(403).json({
            //         error: 'Apenas permitido para PROFESSORES ou ADMIN',
            //     });
            //     return;
            // }

            res.status(200).json({ data: Turma });
        } catch (error) {
            res.status(500).json({
                error: 'Não foi possível atualizar a Turma',
            });
        }
    };

    getAllTurmas = async (req: Request, res: Response) => {
        try {
            const getAll = await this.turmaService.getAllTurmas();

            res.status(200).json({ data: getAll });
            return;
        } catch (error) {
            res.status(500).json({
                error: 'Error ao utilizar o getAllTurmas',
            });
            return;
        }
    };

    getTurmaById = async (req: Request, res: Response) => {
        try {
            const turmaId = parseInt(req.params.id, 10);
            const turma = await this.turmaService.getTurmaById(turmaId);

            res.status(200).json({ data: turma });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar a Turma de id ${req.params.id}`,
            });
            return;
        }
    };
    deleteTurma = async (req: Request, res: Response) => {
        try {
            const turmaId = parseInt(req.params.id, 10);
            const turma = await this.turmaService.deleteTurma(turmaId);

            res.status(204).json({ data: turma });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar a Turma de id ${req.params.id}`,
            });
            return;
        }
    };
}

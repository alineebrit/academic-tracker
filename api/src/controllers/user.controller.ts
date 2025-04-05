/* eslint-disable @typescript-eslint/no-unused-vars */
import { $Enums } from '@prisma/client';
import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';

export class UserController {
    private readonly userService: UserService;
    private readonly authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, name, password, role }: User = req.body;

            if (!email || !name || !password) {
                res.status(400).json({
                    error: 'Campo obrigatório não preenchido',
                });
                return;
            }

            if (!Object.values($Enums.UserRole).includes(role)) {
                res.status(400).json({
                    error: 'Adicione um tipo válido de usuário',
                });
                return;
            }

            const hashPass = await this.authService.hashPassword(password);

            const userData = { email, name, password: hashPass, role };
            const user = await this.userService.createUser(userData);

            res.status(201).json({
                message: 'Usuário criado com sucesso',
                data: user,
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    getAllUsersPaginado = async (req: Request, res: Response) :Promise<void>=> {
        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || 'dueDate';
            const order = (req.query.order as 'asc' | 'desc') || 'asc';
            
           
            const user = await this.userService.getAllUsersPaginado({
                page,
                limit,
                sortBy,
                order
            });
            
            res.status(200).json({ data: user });
        } catch (error) {
            console.error('Erro ao buscar user:', error);
            res.status(500).json({ error: 'Erro ao buscar user' });
        }
    };

    getAllUsers = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Não autorizado' });
                return;
            }
            const getAll = await this.userService.getAllUsers();

            res.status(200).json({
                data: getAll,
                message: 'Você acessou um endpoint protegido!',
                user: req.user,
            });
            return;
        } catch (error) {
            res.status(500).json({
                error: 'Error ao utilizar o getAllUsers',
            });
            return;
        }
    };

    getUserById = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);

            if (!user) {
                throw new Error('User não existe.');
            }
            res.status(200).json({ data: user });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar o usuário de id ${req.params.id}`,
            });
            return;
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const userData = req.body;

            const user = await this.userService.updateUser(
                Number(id),
                userData
            );
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).json({
                error: 'Não foi possível atualizar o usuário',
            });
            return;
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            await this.userService.deleteUser(userId);

            res.status(204).json({ message: 'Usuário deletado com sucesso' });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível excluir o usuário de id ${req.params.id}`,
            });
            return;
        }
    };
}

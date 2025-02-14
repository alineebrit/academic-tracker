/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "./../models/user";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const userData: User = req.body;
            const { email, name, password }: User = req.body;

            if (!email) {
                res.status(401).json({
                    error: "O email do usuário é obrigatório",
                });
            }

            if (!name) {
                res.status(401).json({
                    error: "É necessário preencher o nome do usuário",
                });
            }

            if (!password) {
                res.status(401).json({
                    error: "É necessário preencher a senha",
                });
            }

            const user = await this.userService.createUser(userData);
            res.status(201).json({ data: user });
        } catch (error) {
            res.status(500).json({
                error,
            });
        }
    };

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const getAll = await this.userService.getAllUsers();

            res.status(200).json({ data: getAll });
        } catch (error) {
            res.status(500).json({
                error: "Error ao utilizar o getAllUsers",
            });
        }
    };

    getUserById = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);

            res.status(200).json({ data: user });
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível encontrar o usuário de id ${req.params.id}`,
            });
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
                error: "Não foi possível atualizar o usuário",
            });
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.deleteUser(userId);

            res.status(204).json({ message: "Usuário deletado com sucesso" });
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível excluir o usuário de id ${req.params.id}`,
            });
        }
    };

    // verificarPermissao(userId: number, requiredRole: string) {
    //     const user = await prisma.user.findUnique({ where: { id: userId } });

    //     if (!user) {
    //         throw new Error("Usuário não encontrado");
    //     }

    //     if (user.role !== requiredRole) {
    //         throw new Error("Acesso negado. Permissão insuficiente.");
    //     }
    // }
}

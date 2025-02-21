/* eslint-disable @typescript-eslint/no-unused-vars */
import { $Enums, User } from "@prisma/client";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData: User = req.body;
            const { email, name, password, role }: User = req.body;

            if (!email || !name || !password) {
                res.status(400).json({
                    error: "Campo obrigatório não preenchido",
                });
                return;
            }

            if (
                !role ||
                ![
                    $Enums.UserRole.ADMIN,
                    $Enums.UserRole.ALUNO,
                    $Enums.UserRole.PROFESSOR,
                ].includes(role)
            ) {
                res.status(400).json({
                    error: "Adicione um tipo válido de usuário",
                });
                return;
            }

            if (password && email && name && role) {
                const user = await this.userService.createUser(userData);
                res.status(201).json({ data: user });
                return;
            }
        } catch (error) {
            if (error instanceof Error)
                if (error.message === "O email já está cadastrado.") {
                    res.status(400).json({ error: error.message });
                    return;
                }
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
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
            return;
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
                error: "Não foi possível atualizar o usuário",
            });
            return;
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            await this.userService.deleteUser(userId);

            res.status(204).json({ message: "Usuário deletado com sucesso" });
            return;
        } catch (err) {
            res.status(500).json({
                error: `Não foi possível excluir o usuário de id ${req.params.id}`,
            });
            return;
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

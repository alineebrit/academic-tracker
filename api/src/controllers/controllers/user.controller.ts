import { Request, Response } from "express";
import userService from "../../service/user.service";

class UserController {
    async create(req: Request, res: Response) {
        try {
            const user = await userService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const user = await userService.getById(parseInt(req.params.id, 10));
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const user = await userService.update(parseInt(req.params.id, 10), req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await userService.delete(parseInt(req.params.id, 10));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar usuário" });
        }
    }
}

export default new UserController();

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../service/auth.service';

// const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';/

export class AuthController {
    private readonly authService: AuthService;
    private readonly userClient = new PrismaClient().user;

    constructor() {
        this.authService = new AuthService();
        this.userClient = new PrismaClient().user;
    }

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            const user = await this.userClient.findUnique({ where: { email } });

            if (!user) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return;
            }

            // TODO: mover para o service!
            const senhaValida = await bcrypt.compare(senha, user.password);

            if (!senhaValida) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return;
            }

            const token = this.authService.generateToken({
                id: user.id,
                email: user.email,
            });

            res.json({ token });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Erro ao fazer login', error });
            return;
        }
    }
}

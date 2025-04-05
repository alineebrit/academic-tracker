import { UserRepository } from './../repositories/user.repository';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthService } from '../service/auth.service';

export class AuthController {
    private readonly authService: AuthService;
    private readonly userRepository: UserRepository;

    constructor(authService?: AuthService, userRepository?: UserRepository) {
        this.authService = authService || new AuthService();
        this.userRepository = userRepository || new UserRepository();
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this.userRepository.findUnique(email);

            if (!user) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return;
            }

            const senhaValida = await bcrypt.compare(password, user.password);

            if (!senhaValida) {
                res.status(401).json({ message: 'Credenciais inválidas' });
                return;
            }

            const token = this.authService.generateToken(user.id);

            res.status(200).json({ token, user });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login', error });
            return;
        }
    }
}

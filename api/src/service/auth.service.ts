import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config(); // Carrega as variáveis de ambiente

const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EXPIRES_IN: any = process.env.JWT_EXPIRES_IN || '1h';

export class AuthService {
    generateToken = (user: { id: number; email: string }): string => {
        return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: EXPIRES_IN,
        });
    };

    hashPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10);
    };

    comparePassword = async (
        password: string,
        hash: string
    ): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    };
}

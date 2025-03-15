/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export class AuthService {
    SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';
    EXPIRES_IN: any = process.env.JWT_EXPIRES_IN || '1h';

    constructor() {}

    generateToken = (id: number): string => {
        return jwt.sign({ id }, this.SECRET_KEY, {
            expiresIn: this.EXPIRES_IN,
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

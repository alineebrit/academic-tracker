import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../service/user.service';

dotenv.config();

const userService = new UserService();

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        //
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        const user = await userService.getUserById(decoded.id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token inválido' });
        return;
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);

        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

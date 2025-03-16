import { $Enums } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const validateRole = (roles: $Enums.UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            res.status(401).json({ message: 'Usuário não autenticado' });
            return;
        }

        if (!roles.includes(user.role)) {
            res.status(403).json({
                message: 'Acesso negado: você não possui permissão',
            });
            return;
        }

        next();
    };
};

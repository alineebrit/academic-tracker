import { $Enums } from '@prisma/client';

export type User = {
    id?: number;
    email: string;
    name: string;
    password: string;
    role: $Enums.UserRole;
    grupoId?: number | null;
};

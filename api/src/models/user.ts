import { $Enums } from '@prisma/client';

export interface User {
    id?: number;
    email: string;
    name: string;
    password: string;
    role: $Enums.UserRole;
    grupoId?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}

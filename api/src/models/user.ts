import { UserRole } from "./role";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    grupoId?: number;
    createdAt: Date;
    updatedAt: Date;
}

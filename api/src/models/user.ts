import { UserRole } from "./role";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    created_at?: Date;
    updated_at?: Date;
}

export interface Atividade {
    id: number;
    title: string;
    description?: string;
    dueDate?: Date;
    grupoId: number;
}

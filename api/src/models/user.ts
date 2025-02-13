import { UserRole } from "./role";

export interface User {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    created_at?: Date;
    updated_at?: Date;
}

export interface Atividade {
    title: string;
    description?: string;
    dueDate?: Date;
    grupoId: number;
}

export interface Grupo {
    title: string;
    description?: string;
    dueDate?: Date;
    grupoId: number;
}

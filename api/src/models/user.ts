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

export interface Turma {
    name: string;
    userId: number;
}

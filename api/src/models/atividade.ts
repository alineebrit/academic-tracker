export interface Atividade {
    id?: number;
    title: string;
    description: string | null;
    dueDate: Date | null;
    grupoId: number | null;
}
export interface Atividade {
    id?: number;
    title: string;
    description: string | null;
    dueDate: string | null;
    grupoId: number;
}

export interface Note {
    id: number;
    grupoId: number;
    createdAt: Date;
    title: string;
    content: string | null; 
}

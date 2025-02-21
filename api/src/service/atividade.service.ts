import { Atividade } from "../models/atividade";
import { AtividadeRepository } from "../repositories/atividade.repository";

export class AtividadeService {
    private readonly atividadeRepository: AtividadeRepository;

    constructor() {
        this.atividadeRepository = new AtividadeRepository();
    }

    createAtividade = async (data: Atividade) => {
        return await this.atividadeRepository.createAtividade(data);
    };

    getAllAtividade = async () => {
        return await this.atividadeRepository.getAllAtividade();
    };

    getAtividadeById = async (id: number) => {
        return await this.atividadeRepository.getByIdAtividade(id);
    };

    updateAtividade = async (
        atividadeId: number,
        data: Partial<{ title: string; description: string; dueDate: Date }>
    ) => {
        return await this.atividadeRepository.updateAtividade(
            atividadeId,
            data
        );
    };

    deleteAtividade = async (id: number) => {
        return await this.atividadeRepository.deleteAtividade(id);
    };
}

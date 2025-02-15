import { Turma } from "../models/user";
import { TurmaRepository } from "../repositories/turma.repository";

export class TurmaService {
    private readonly turmaRepository: TurmaRepository;

    constructor() {
        this.turmaRepository = new TurmaRepository();
    }

    createTurma = async (data: Turma) => {
        return await this.turmaRepository.createTurma(data);
    };

    getAllTurmas = async () => {
        return await this.turmaRepository.getAllTurma();
    };

    getTurmaById = async (id: number) => {
        return await this.turmaRepository.getByIdTurma(id);
    };

    updateTurma = async (turmaId: number, data: Turma) => {
        return await this.turmaRepository.updateTurma(turmaId, data);
    };

    deleteTurma = async (id: number) => {
        return await this.turmaRepository.deleteTurma(id);
    };
}

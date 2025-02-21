import { UserRepository } from "./../repositories/user.repository";
import { Turma } from "@prisma/client";
import { TurmaRepository } from "../repositories/turma.repository";

export class TurmaService {
    private readonly turmaRepository: TurmaRepository;
    private readonly userRepository: UserRepository;

    constructor() {
        this.turmaRepository = new TurmaRepository();
        this.userRepository = new UserRepository();
    }

    createTurma = async (data: Turma) => {
        const userRole = await this.userRepository.getUserRole(data.userId);

        if (userRole === "ALUNO") {
            throw new Error("Usuário do tipo ALUNO não pode criar uma turma");
        }

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

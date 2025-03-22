import { UserRepository } from "./../repositories/user.repository";
import { Turma } from "@prisma/client";
import { TurmaRepository } from "../repositories/turma.repository";

interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

interface PaginatedResult<T> {
    data: T[];
    meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

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

     getAllTurmasPaginado = async (params: PaginationParams = {}): Promise<PaginatedResult<Turma>> => {
              // Valores padrão para paginação
              const page = params.page || 1;
              const limit = params.limit || 10;
              const sortBy = params.sortBy || 'dueDate';
              const order = params.order || 'asc';
              
              // Obter dados paginados e contagem total do repositório
              const [turmas, totalItems] = await Promise.all([
                  this.turmaRepository.findAllPaginado(page, limit, sortBy, order),
                  this.turmaRepository.countTurmas()
              ]);
              
              // Calcular metadados de paginação
              const totalPages = Math.ceil(totalItems / limit);
              
              // Retornar resultado formatado
              return {
                  data: turmas,
                  meta: {
                      currentPage: page,
                      itemsPerPage: limit,
                      totalItems,
                      totalPages,
                      hasNextPage: page < totalPages,
                      hasPrevPage: page > 1
                  }
              };
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

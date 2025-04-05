import { Atividade } from "../models/atividade";
import { AtividadeRepository } from "../repositories/atividade.repository";

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

    getAllAtividadePaginado = async (params: PaginationParams = {}): Promise<PaginatedResult<Atividade>> => {

        const page = params.page || 1;
        const limit = params.limit || 10;
        const sortBy = params.sortBy || 'dueDate';
        const order = params.order || 'asc';
        
        const [atividades, totalItems] = await Promise.all([
            this.atividadeRepository.getAllAtividadePaginated(page, limit, sortBy, order),
            this.atividadeRepository.countAtividades()
        ]);
        
        const totalPages = Math.ceil(totalItems / limit);
        

        return {
            data: atividades,
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

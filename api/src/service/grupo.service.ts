import { GrupoRepository } from "../repositories/grupo.repository";
import { Grupo } from "@prisma/client";

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

export class GrupoService {
    private readonly grupoRepository = new GrupoRepository();

    async createGrupo(grupo: Grupo) {
        return await this.grupoRepository.createGrupo(grupo);
    }

    
    async getAllGrupos() {
        return await this.grupoRepository.findAll();
    }

    

    getAllGruposPaginado = async (params: PaginationParams = {}): Promise<PaginatedResult<Grupo>> => {
 
          const page = params.page || 1;
          const limit = params.limit || 10;
          const sortBy = params.sortBy || 'dueDate';
          const order = params.order || 'asc';
          

          const [grupos, totalItems] = await Promise.all([
              this.grupoRepository.findAllPaginado(page, limit, sortBy, order),
              this.grupoRepository.countGrupos()
          ]);
          

          const totalPages = Math.ceil(totalItems / limit);
          

          return {
              data: grupos,
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

    async getGrupoById(id: number) {
        return await this.grupoRepository.findById(id);
    }

    async updateGrupo(id: number, grupo: Grupo) {
        return await this.grupoRepository.update(id, grupo);
    }

    async deleteGrupo(id: number) {
        return await this.grupoRepository.delete(id);
    }
}

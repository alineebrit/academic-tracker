import { User } from '../models/user';
import { UserRepository } from '../repositories/user.repository';


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

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser = async (data: User) => {
        const userExists = await this.verifyUniqueUser(data.email);
        if (userExists) {
            throw new Error('O email já está cadastrado.');
        }
        return await this.userRepository.createUser(data);
    };

    getAllUsers = async () => {
        return await this.userRepository.getAllUser();
    };

    getAllUsersPaginado = async (params: PaginationParams = {}): Promise<PaginatedResult<User>> => {
                  // Valores padrão para paginação
                  const page = params.page || 1;
                  const limit = params.limit || 10;
                  const sortBy = params.sortBy || 'dueDate';
                  const order = params.order || 'asc';
                  
                  // Obter dados paginados e contagem total do repositório
                  const [users, totalItems] = await Promise.all([
                      this.userRepository.findAllPaginado(page, limit, sortBy, order),
                      this.userRepository.countUser()
                  ]);
                  
                  // Calcular metadados de paginação
                  const totalPages = Math.ceil(totalItems / limit);
                  
                  // Retornar resultado formatado
                  return {
                      data: users,
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
        

    getUserById = async (id: number) => {
        return await this.userRepository.getByIdUser(id);
    };

    updateUser = async (userId: number, data: User) => {
        return await this.userRepository.updateUser(userId, data);
    };

    deleteUser = async (id: number) => {
        return await this.userRepository.deleteUser(id);
    };

    verifyUniqueUser = async (email: string) => {
        return await this.userRepository
            .countByEmail(email)
            .then((e) => e >= 1);
    };
}

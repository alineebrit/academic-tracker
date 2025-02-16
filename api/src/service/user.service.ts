import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser = async (data: User) => {
        return await this.userRepository.createUser(data);
    };

    getAllUsers = async () => {
        return await this.userRepository.getAllUser();
    };

    getUserById = async (id: number) => {
        return await this.userRepository.getByIdUser(id);
    };

    updateUser = async (
        userId: number,
        data: Partial<{ title: string; description: string; dueDate: Date }>
    ) => {
        return await this.userRepository.updateUser(userId, data);
    };

    deleteUser = async (id: number) => {
        return await this.userRepository.deleteUser(id);
    };

    // async verificarPermissao(userId: number, requiredRole: string) {
    //     const user = await prisma.user.findUnique({ where: { id: userId } });

    //     if (!user) {
    //         throw new Error("Usuário não encontrado");
    //     }

    //     if (user.role !== requiredRole) {
    //         throw new Error("Acesso negado. Permissão insuficiente.");
    //     }
    // }
}

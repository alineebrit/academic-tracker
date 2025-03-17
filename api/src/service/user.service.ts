import { $Enums } from '@prisma/client';
import { User } from '../models/user';
import { UserRepository } from '../repositories/user.repository';
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

    isAdminOrProfessor = async (userId: number): Promise<boolean> => {
        const user = await this.getUserById(userId);

        if (!user) return false;

        const allowedRoles: $Enums.UserRole[] = [
            $Enums.UserRole.ADMIN,
            $Enums.UserRole.PROFESSOR,
        ];

        return allowedRoles.includes(user.role);
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

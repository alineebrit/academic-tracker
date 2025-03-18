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
}

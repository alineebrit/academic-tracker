import { $Enums, PrismaClient } from '@prisma/client';
import { User } from '../models/user';

export class UserRepository {
    userClient = new PrismaClient().user;

    constructor() {
        this.userClient = new PrismaClient().user;
    }

    createUser = async (data: User) => {
        return await this.userClient.create({ data });
    };

    countByEmail(email: string): Promise<number> {
        return this.userClient.count({
            where: { email },
        });
    }

    getAllUser = async () => {
        return await this.userClient.findMany();
    };

    async findAllPaginado(
        page: number,
        limit: number,
        sortBy: string,
        order: 'asc' | 'desc'
    ) {
        const skip = (page - 1) * limit;
        
        return this.userClient.findMany({
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
            }
        });
    }

     async countUser() {
        return this.userClient.count();
    }


    getByIdUser = async (id: number): Promise<User | null> => {
        return await this.userClient.findUnique({ where: { id } });
    };

    getUserRole = async (id: number): Promise<$Enums.UserRole | undefined> => {
        return this.getByIdUser(id).then((e) => e?.role);
    };

    updateUser = async (userId: number, data: User) => {
        return await this.userClient.update({ where: { id: userId }, data });
    };

    deleteUser = async (id: number) => {
        return await this.userClient.delete({ where: { id } });
    };

    findUnique = async (email: string) => {
        return await this.userClient.findUnique({ where: { email } });
    };
}

export default new UserRepository();

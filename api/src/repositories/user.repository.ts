import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";

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

    getByIdUser = async (id: number) => {
        return await this.userClient.findUnique({ where: { id } });
    };

    updateUser = async (userId: number, data: User) => {
        return await this.userClient.update({ where: { id: userId }, data });
    };

    deleteUser = async (id: number) => {
        return await this.userClient.delete({ where: { id } });
    };
}

export default new UserRepository();

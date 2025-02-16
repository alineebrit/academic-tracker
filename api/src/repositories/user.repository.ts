import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";

export class UserRepository {
    UserClient = new PrismaClient().user;

    createUser = async (data: User) => {
        return await this.UserClient.create({ data });
    };

    getAllUser = async () => {
        return await this.UserClient.findMany();
    };

    getByIdUser = async (id: number) => {
        return await this.UserClient.findUnique({ where: { id } });
    };

    updateUser = async (
        UserId: number,
        data: Partial<{ title: string; description: string; dueDate: Date }>
    ) => {
        return await this.UserClient.update({ where: { id: UserId }, data });
    };

    deleteUser = async (id: number) => {
        return await this.UserClient.delete({ where: { id } });
    };
}

export default new UserRepository();

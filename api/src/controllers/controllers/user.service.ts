import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class UserService {
    /**
     * Cria um novo usuário no sistema
     */
    async create(userData: { name: string; email: string; password: string; role: string }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await prisma.user.create({
            data: { ...userData, password: hashedPassword },
        });
        return user;
    }

    /**
     * Retorna todos os usuários cadastrados
     */
    async getAll() {
        return await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }
        });
    }

    /**
     * Busca um usuário pelo ID
     */
    async getById(id: number) {
        return await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }
        });
    }

    /**
     * Atualiza os dados de um usuário
     */
    async update(id: number, userData: Partial<{ name: string; email: string; password: string; role: string }>) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await prisma.user.update({
            where: { id },
            data: userData,
        });
    }

    /**
     * Deleta um usuário do sistema
     */
    async delete(id: number) {
        return await prisma.user.delete({
            where: { id },
        });
    }

    /**
     * Verifica permissões de usuário
     */
    async verificarPermissao(userId: number, requiredRole: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (user.role !== requiredRole) {
            throw new Error("Acesso negado. Permissão insuficiente.");
        }
    }
}

export default new UserService();

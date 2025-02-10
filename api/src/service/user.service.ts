import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class UserService {
    /**
     * Cria um novo usuário no sistema
     * @param userData - Dados do usuário
     * @returns Usuário criado
     */
    async create(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
        // Criptografando a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        return user;
    }

    /**
     * Retorna todos os usuários cadastrados
     * @returns Lista de usuários
     */
    async getAll() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    /**
     * Busca um usuário pelo ID
     * @param id - ID do usuário
     * @returns Usuário encontrado ou null
     */
    async getById(id: number) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    /**
     * Atualiza os dados de um usuário
     * @param id - ID do usuário
     * @param userData - Novos dados do usuário
     * @returns Usuário atualizado
     */
    async update(id: number, userData: Partial<User>) {
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
     * @param id - ID do usuário
     * @returns Usuário deletado
     */
    async delete(id: number) {
        return await prisma.user.delete({
            where: { id },
        });
    }

    async verificarPermissao(userId: number, requiredRole: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
    
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
    
        if (user.role !== requiredRole) {
            throw new Error("Acesso negado. Permissão insuficiente.");
        }
    }
    


export default new UserService();

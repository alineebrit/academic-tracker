import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middlewares';
import { validateRole } from '../middlewares/roles.middlewares';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: [ALUNO, PROFESSOR]
 *                 example: "ALUNO"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authenticateToken, userController.createUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Maria Souza"
 *                   email:
 *                     type: string
 *                     example: "maria@email.com"
 *                   role:
 *                     type: string
 *                     example: "PROFESSOR"
 */
router.get(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    userController.getAllUsers
);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário específico pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Pedro Lima"
 *                 email:
 *                   type: string
 *                   example: "pedro@email.com"
 *                 role:
 *                   type: string
 *                   example: "ALUNO"
 *       404:
 *         description: Usuário não encontrado
 */
router.get(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    userController.getUserById
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ana Pereira"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ana@email.com"
 *               password:
 *                 type: string
 *                 example: "novaSenha123"
 *               role:
 *                 type: string
 *                 enum: [ALUNO, PROFESSOR]
 *                 example: "PROFESSOR"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Usuário não encontrado
 */
router.put(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN']),
    userController.updateUser
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN']),
    userController.deleteUser
);

export default router;

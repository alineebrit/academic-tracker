import { Router } from 'express';
import { TurmaController } from '../controllers/turma.controller';
import { authenticateToken } from '../middlewares/auth.middlewares';
import { validateRole } from '../middlewares/roles.middlewares';

const router = Router();
const turmaController = new TurmaController();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas
 */

/**
 * @swagger
 * /turma:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "turmateste"
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    turmaController.createTurma
);

/**
 * @swagger
 * /turma:
 *   get:
 *     summary: Retorna todas as turmas
 *     tags: [Turmas]
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
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
 *                     example: "Turma A"
 *                   userId:
 *                     type: integer
 *                     example: 1
 */
router.get(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    turmaController.getAllTurmas
);

/**
 * @swagger
 * /turma/{id}:
 *   get:
 *     summary: Retorna uma turma específica pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma encontrada
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
 *                   example: "Turma A"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Turma não encontrada
 */
router.get(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    turmaController.getTurmaById
);

/**
 * @swagger
 * /turma/{id}:
 *   put:
 *     summary: Atualiza uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Turma B"
 *               userId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Turma não encontrada
 */
router.put(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    turmaController.updateTurma
);

/**
 * @swagger
 * /turma/{id}:
 *   delete:
 *     summary: Exclui uma turma pelo ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma excluída com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.delete(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    turmaController.deleteTurma
);

export default router;

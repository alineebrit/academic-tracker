import { authenticateToken } from './../middlewares/auth.middlewares';
import { Router } from 'express';
import { AtividadeController } from '../controllers/atividades.controller';
import { validateRole } from '../middlewares/roles.middlewares';

const router = Router();
const atividadeController = new AtividadeController();

/**
 * @swagger
 * tags:
 *   name: Atividades
 *   description: Gerenciamento de atividades
 */

/**
 * @swagger
 * /atividades:
 *   post:
 *     summary: Cria uma nova atividade
 *     tags: [Atividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Atividade de Matemática"
 *               description:
 *                 type: string
 *                 example: "Resolver 10 exercícios sobre equações"
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    atividadeController.createAtividade
);

/**
 * @swagger
 * /atividades:
 *   get:
 *     summary: Retorna todas as atividades
 *     tags: [Atividades]
 *     responses:
 *       200:
 *         description: Lista de atividades retornada com sucesso
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
 *                   title:
 *                     type: string
 *                     example: "Atividade de Ciências"
 *                   description:
 *                     type: string
 *                     example: "Pesquisa sobre meio ambiente"
 */
router.get(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    atividadeController.getAllAtividades
);

/**
 * @swagger
 * /atividades/{id}:
 *   get:
 *     summary: Retorna uma atividade específica pelo ID
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da atividade
 *     responses:
 *       200:
 *         description: Atividade encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Atividade de História"
 *                 description:
 *                   type: string
 *                   example: "Linha do tempo da Revolução Francesa"
 *       404:
 *         description: Atividade não encontrada
 */
router.get(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    atividadeController.getAtividadeById
);

/**
 * @swagger
 * /atividades/{id}:
 *   put:
 *     summary: Atualiza uma atividade pelo ID
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da atividade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Atividade de Inglês"
 *               description:
 *                 type: string
 *                 example: "Tradução de um texto"
 *     responses:
 *       200:
 *         description: Atividade atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Atividade não encontrada
 */
router.put(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    atividadeController.updateAtividade
);

/**
 * @swagger
 * /atividades/{id}:
 *   delete:
 *     summary: Exclui uma atividade pelo ID
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da atividade
 *     responses:
 *       200:
 *         description: Atividade excluída com sucesso
 *       404:
 *         description: Atividade não encontrada
 */
router.delete(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    atividadeController.deleteAtividade
);

export default router;

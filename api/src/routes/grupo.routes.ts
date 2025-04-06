import { Router } from 'express';
import { GrupoController } from '../controllers/grupo.controller';
import { authenticateToken } from '../middlewares/auth.middlewares';
import { validateRole } from '../middlewares/roles.middlewares';

const router = Router();
const grupoController = new GrupoController();

/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Gerenciamento de grupos
 */

/**
 * @swagger
 * /grupo:
 *   post:
 *     summary: Cria um novo grupo
 *     tags: [Grupos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "grupoteste"
 *               turmaId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Grupo criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    grupoController.createGrupo
);

/**
 * @swagger
 * /grupo:
 *   get:
 *     summary: Retorna todos os grupos
 *     tags: [Grupos]
 *     responses:
 *       200:
 *         description: Lista de grupos retornada com sucesso
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
 *                     example: "Grupo A"
 *                   turmaId:
 *                     type: integer
 *                     example: 1
 */
router.get(
    '/',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    grupoController.getAllGrupos
);

/**
 * @swagger
 * /grupo/{id}:
 *   get:
 *     summary: Retorna um grupo específico pelo ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Grupo encontrado
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
 *                   example: "Grupo A"
 *                 turmaId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Grupo não encontrado
 */
router.get(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    grupoController.getGrupoById
);

/**
 * @swagger
 * /grupo/{id}:
 *   put:
 *     summary: Atualiza um grupo pelo ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Grupo B"
 *               turmaId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Grupo atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Grupo não encontrado
 */
router.put(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    grupoController.updateGrupo
);

/**
 * @swagger
 * /grupo/{id}:
 *   delete:
 *     summary: Exclui um grupo pelo ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Grupo excluído com sucesso
 *       404:
 *         description: Grupo não encontrado
 */
router.delete(
    '/:id',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR']),
    grupoController.deleteGrupo
);

router.get(
    '/:id/grupos',
    authenticateToken,
    validateRole(['ADMIN', 'PROFESSOR', 'ALUNO']),
    grupoController.getGruposByTurmaId
);

export default router;

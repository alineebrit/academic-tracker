import { Router } from "express";
import { TurmaController } from "../controllers/turma.controller";

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
 *               nome:
 *                 type: string
 *                 example: "Turma A"
 *               descricao:
 *                 type: string
 *                 example: "Turma do 5º ano - Matemática"
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", turmaController.createTurma);

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
 *                   nome:
 *                     type: string
 *                     example: "Turma A"
 *                   descricao:
 *                     type: string
 *                     example: "Turma do 5º ano - Matemática"
 */
router.get("/", turmaController.getAllTurmas);

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
 *                 nome:
 *                   type: string
 *                   example: "Turma A"
 *                 descricao:
 *                   type: string
 *                   example: "Turma do 5º ano - Matemática"
 *       404:
 *         description: Turma não encontrada
 */
router.get("/:id", turmaController.getTurmaById);

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
 *               nome:
 *                 type: string
 *                 example: "Turma B"
 *               descricao:
 *                 type: string
 *                 example: "Turma de reforço em Matemática"
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Turma não encontrada
 */
router.put("/:id", turmaController.updateTurma);

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
router.delete("/:id", turmaController.deleteTurma);

export default router;

import { Router } from "express";
import { AtividadeController } from "../controllers/atividades.controller";

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
 *               titulo:
 *                 type: string
 *                 example: "Atividade de Matemática"
 *               descricao:
 *                 type: string
 *                 example: "Resolver 10 exercícios sobre equações"
 *               dataEntrega:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-20"
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", atividadeController.createAtividade);

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
 *                   titulo:
 *                     type: string
 *                     example: "Atividade de Ciências"
 *                   descricao:
 *                     type: string
 *                     example: "Pesquisa sobre meio ambiente"
 *                   dataEntrega:
 *                     type: string
 *                     format: date
 *                     example: "2025-03-10"
 */
router.get("/", atividadeController.getAllAtividades);

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
 *                 titulo:
 *                   type: string
 *                   example: "Atividade de História"
 *                 descricao:
 *                   type: string
 *                   example: "Linha do tempo da Revolução Francesa"
 *                 dataEntrega:
 *                   type: string
 *                   format: date
 *                   example: "2025-04-05"
 *       404:
 *         description: Atividade não encontrada
 */
router.get("/:id", atividadeController.getAtividadeById);

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
 *               titulo:
 *                 type: string
 *                 example: "Atividade de Inglês"
 *               descricao:
 *                 type: string
 *                 example: "Tradução de um texto"
 *               dataEntrega:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-25"
 *     responses:
 *       200:
 *         description: Atividade atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Atividade não encontrada
 */
router.put("/:id", atividadeController.updateAtividade);

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
router.delete("/:id", atividadeController.deleteAtividade);

export default router;

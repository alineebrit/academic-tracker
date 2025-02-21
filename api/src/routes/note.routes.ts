import { Router } from "express";
import { NoteController } from "../controllers/note.controller";

const router = Router();
const noteController = new NoteController();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gerenciamento de notas
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Cria uma nova nota
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nota do grupo Aline e Luís"
 *               content:
 *                 type: string
 *                 example: "Os alunos seguiram os requisitos esperados"
 *               grupoId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retorna todas as notas
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Lista de notas retornada com sucesso
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
 *                     example: "Nota do grupo Aline e Luís"
 *                   content:
 *                     type: string
 *                     example: "Os alunos seguiram os requisitos esperados"
 *                   grupoId:
 *                     type: integer
 *                     example: 2
 */
router.get("/", noteController.getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retorna uma nota específica pelo ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota encontrada
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
 *                   example: "Nota do grupo Aline e Luís"
 *                 content:
 *                   type: string
 *                   example: "Os alunos seguiram os requisitos esperados"
 *                 grupoId:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Nota não encontrada
 */
router.get("/:id", noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Atualiza uma nota pelo ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nota do grupo atualizado"
 *               content:
 *                 type: string
 *                 example: "A nota foi revisada com novas considerações"
 *               grupoId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Nota não encontrada
 */
router.put("/:id", noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Exclui uma nota pelo ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota excluída com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.delete("/:id", noteController.deleteNote);

export default router;

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
 */
router.post("/", noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retorna todas as notas
 *     tags: [Notes]
 */
router.get("/", noteController.getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retorna uma nota específica pelo ID
 *     tags: [Notes]
 */
router.get("/:id", noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Atualiza uma nota pelo ID
 *     tags: [Notes]
 */
router.put("/:id", noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Exclui uma nota pelo ID
 *     tags: [Notes]
 */
router.delete("/:id", noteController.deleteNote);

export default router;

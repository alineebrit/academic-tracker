import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login na aplicação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login na aplicação
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   email:
 *                     type: string
 *                     example: "luis1@email.com"
 *                   password:
 *                     type: string
 *                     example: "12314"
 *     responses:
 *       200:
 *         description: Retorna o token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "luis1@email.com"
 *                   password:
 *                     type: string
 *                     example: "12314"
 */
router.post('/login', (req, res) => authController.login(req, res));

export default router;

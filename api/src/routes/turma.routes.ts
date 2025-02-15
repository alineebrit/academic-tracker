import { Router } from "express";
import { TurmaController } from "../controllers/turma.controller";

const router = Router();
const turmaController = new TurmaController();

router.post("/", turmaController.createTurma);
router.get("/", turmaController.getAllTurmas);
router.get("/:id", turmaController.getTurmaById);
router.put("/:id", turmaController.updateTurma);
router.delete("/:id", turmaController.deleteTurma);

export default router;

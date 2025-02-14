import { Router } from "express";
import { AtividadeController } from "../controllers/atividades.controller";

const router = Router();
const atividadeController = new AtividadeController();

router.post("/", atividadeController.createAtividade);
router.get("/", atividadeController.getAllAtividades);
router.get("/:id", atividadeController.getAtividadeById);
router.put("/:id", atividadeController.updateAtividade);
router.delete("/:id", atividadeController.deleteAtividade);

export default router;

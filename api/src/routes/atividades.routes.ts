import { Router } from "express";
import atividadeController from "../controllers/atividades.controller";

const router = Router();

router.post("/", atividadeController.create);
router.get("/", atividadeController.getAll);
// router.get("/:id", atividadeController.getById);
router.put("/:id", atividadeController.update);
router.delete("/:id", atividadeController.delete);

export default router;

import { Router } from "express";
import {
    create,
    getAll,
    getById,
    update,
    exclude,
} from "../controllers/atividades.controller";

const router = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", exclude);

export default router;

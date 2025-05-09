import { Router } from "express";
import { saveStartingLineupController, getStartingLineupController } from "../controllers/lineup";
import { requireRole } from "../middleware/client/roles";
import { authMiddleware } from "../middleware/client/auth";

const router = Router();

router.use(authMiddleware);

router.post("/:gameId/starting-lineup", requireRole(["coach"]), saveStartingLineupController);
router.get("/:gameId/starting-lineup/:period", getStartingLineupController);

export default router;
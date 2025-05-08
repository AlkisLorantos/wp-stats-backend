import { Router } from "express";
import { saveStartingLineupController, getStartingLineupController } from "../controllers/lineup";
import { requireRole } from "../middleware/client/roles";
import { authMiddleware } from "../middleware/client/auth";

const router = Router();

router.use(authMiddleware);

router.post("/games/:gameId/lineup", requireRole(["coach"]), saveStartingLineupController);
router.get("/games/:gameId/lineup/:period", getStartingLineupController);

export default router;
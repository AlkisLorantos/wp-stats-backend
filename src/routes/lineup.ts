import { Router } from "express";
import { saveStartingLineupController, getStartingLineupController } from "../controllers/lineup";
import { requireRole } from "../middleware/client/roles";
import { authMiddleware } from "../middleware/client/auth";

const router = Router({ mergeParams: true });
router.use(authMiddleware);

router.post("/", requireRole(["coach"]), saveStartingLineupController);
router.get("/:period", getStartingLineupController);

export default router;
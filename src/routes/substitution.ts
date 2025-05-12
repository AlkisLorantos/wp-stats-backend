import { Router } from "express";
import { authMiddleware } from "../middleware/client/auth";
import {
  createSubstitution,
  getGameSubstitutions,
  getPlayerPlayingTime
} from "../controllers/substitution";
import { requireRole } from "../middleware/client/roles";

const router = Router({ mergeParams: true });
router.use(authMiddleware);

router.post("/", requireRole(["coach"]), createSubstitution);
router.get("/", getGameSubstitutions);
router.get("/players/:playerId/playing-time", getPlayerPlayingTime);

export default router;
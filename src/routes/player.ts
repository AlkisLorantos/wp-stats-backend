import { Router } from "express";
import {
  getAllPlayers,
  getPlayer,
  createPlayerController,
  updatePlayerController,
  deletePlayerController,
} from "../controllers/player";
import { getPlayerStatsController } from "../controllers/stat";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllPlayers);
router.get("/:id", getPlayer);
router.get("/:id/stats", getPlayerStatsController);

router.post("/", requireRole(["coach"]), createPlayerController);
router.put("/:id", requireRole(["coach"]), updatePlayerController);
router.delete("/:id", requireRole(["coach"]), deletePlayerController);

export default router;
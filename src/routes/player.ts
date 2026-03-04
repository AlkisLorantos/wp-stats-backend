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
import { validate } from "../middleware/validate";
import { createPlayerSchema, updatePlayerSchema } from "../validators/player";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllPlayers);
router.get("/:id", getPlayer);
router.get("/:id/stats", getPlayerStatsController);

router.post("/", requireRole(["coach"]), validate(createPlayerSchema), createPlayerController);
router.put("/:id", requireRole(["coach"]), validate(updatePlayerSchema), updatePlayerController);
router.delete("/:id", requireRole(["coach"]), deletePlayerController);

export default router;
import { Router } from "express";
import {
  getAllGames,
  getGame,
  createGameController,
  updateGameController,
  deleteGameController,
} from "../controllers/game";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllGames);
router.get("/:id", getGame);

router.post("/", requireRole(["coach"]), createGameController);
router.put("/:id", requireRole(["coach"]), updateGameController);
router.delete("/:id", requireRole(["coach"]), deleteGameController);

export default router;
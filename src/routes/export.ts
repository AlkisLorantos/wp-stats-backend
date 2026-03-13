import { Router } from "express";
import {
  exportPlayersController,
  exportGamesController,
  exportStatsController,
} from "../controllers/export";
import { authMiddleware } from "../middleware/client/auth";

const router = Router();

router.use(authMiddleware);

router.get("/players", exportPlayersController);
router.get("/games", exportGamesController);
router.get("/stats", exportStatsController);

export default router;
import { Router } from "express";
import {
  getAllGames,
  getGame,
  createGameController,
  updateGameController,
  deleteGameController,
  startGameController,
  endGameController,
} from "../controllers/game";
import rosterRouter from './roster';
import statRouter from "./stat";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";
import lineupRouter from "./lineup";
import substitutionRouter from "./substitution";


const router = Router({ mergeParams: false });        

router.use(authMiddleware);

router.get("/", getAllGames);
router.get("/:id", getGame);

router.post("/", requireRole(["coach"]), createGameController);
router.put("/:id",  requireRole(["coach"]), updateGameController);
router.delete("/:id", requireRole(["coach"]), deleteGameController);

router.patch("/:id/start", requireRole(["coach"]), startGameController);
router.patch("/:id/end",   requireRole(["coach"]), endGameController);

router.use("/:id/stats", statRouter);
router.use("/:id/substitutions", substitutionRouter);
router.use("/:id/roster", rosterRouter);
router.use("/:id/lineup", lineupRouter)

import { getPlayerPlayingTime } from "../controllers/substitution";
router.get("/:id/players/:playerId/playing-time", getPlayerPlayingTime);

export default router;
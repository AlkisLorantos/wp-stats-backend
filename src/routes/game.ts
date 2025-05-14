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
router.get("/:gameId", getGame);

router.post("/", requireRole(["coach"]), createGameController);
router.put("/:gameId",  requireRole(["coach"]), updateGameController);
router.delete("/:gameId", requireRole(["coach"]), deleteGameController);

router.patch("/:gameId/start", requireRole(["coach"]), startGameController);
router.patch("/:gameId/end",   requireRole(["coach"]), endGameController);

router.use("/:gameId/stats", statRouter);
router.use("/:gameId/substitutions", substitutionRouter);
router.use("/:gameId/roster", rosterRouter);
router.use("/:gameId/starting-lineup", lineupRouter)

import { getPlayerPlayingTime } from "../controllers/substitution";
router.get("/:gameId/players/:playerId/playing-time", getPlayerPlayingTime);

export default router;
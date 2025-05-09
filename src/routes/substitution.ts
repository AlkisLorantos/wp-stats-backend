import { Router } from "express";
import { authMiddleware } from "../middleware/client/auth";
import {
  createSubstitution,
  getGameSubstitutions,
  getPlayerPlayingTime
} from "../controllers/substitution";

const router = Router();

router.use(authMiddleware);
router.post("/", createSubstitution);
router.get("/:gameId", getGameSubstitutions);
router.get("/games/:gameId/players/:playerId/playing-time", getPlayerPlayingTime);
export default router;
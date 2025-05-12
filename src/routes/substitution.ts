import { Router } from "express";
import { authMiddleware } from "../middleware/client/auth";
import {
  createSubstitution,
  getGameSubstitutions,
  getPlayerPlayingTime
} from "../controllers/substitution";

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.post("/", createSubstitution);
router.get("/", getGameSubstitutions);
router.get("/playing-time", getPlayerPlayingTime);
export default router;
import { Router } from "express";
import { authMiddleware } from "../middleware/client/auth";
import {
  createSubstitution,
  getGameSubstitutions,
} from "../controllers/substitution";

const router = Router();

router.use(authMiddleware);
router.post("/", createSubstitution);
router.get("/:gameId", getGameSubstitutions);

export default router;
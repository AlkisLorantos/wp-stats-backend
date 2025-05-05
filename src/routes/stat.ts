import { Router } from "express";
import {
  createStat,
  getGameStats,
  deleteStat,
} from "../controllers/stat";

import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();

router.use(authMiddleware);

// Public team access
router.get("/game/:gameId", getGameStats);

// Coach-only stat input/delete
router.post("/", requireRole(["coach"]), createStat);
router.delete("/:id", requireRole(["coach"]), deleteStat);

export default router;
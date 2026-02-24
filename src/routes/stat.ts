import { Router } from "express";
import {
  createStat,
  getGameStats,
  deleteStat,
  updateStat,
  createGoalWithAssist,
} from "../controllers/stat";

import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const statRouter = Router({ mergeParams: true });

statRouter.use(authMiddleware);

statRouter.get("/", getGameStats);
statRouter.post("/", requireRole(["coach"]), createStat);
statRouter.post("/goal-with-assist", requireRole(["coach"]), createGoalWithAssist);
statRouter.put("/:id", requireRole(["coach"]), updateStat);
statRouter.delete("/:id", requireRole(["coach"]), deleteStat);

export default statRouter;
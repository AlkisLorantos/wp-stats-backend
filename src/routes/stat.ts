import { Router } from "express";
import {
  createStatController,
  getGameStatsController,
  deleteStatController,
  updateStatController,
  createGoalWithAssistController,
  createShotWithLocationController
} from "../controllers/stat";

import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const statRouter = Router({ mergeParams: true });

statRouter.use(authMiddleware);

statRouter.get("/", getGameStatsController);
statRouter.post("/", requireRole(["coach"]), createStatController);
statRouter.post("/goal-with-assist", requireRole(["coach"]), createGoalWithAssistController);
statRouter.post("/shot", requireRole(["coach"]), createShotWithLocationController);
statRouter.put("/:id", requireRole(["coach"]), updateStatController);
statRouter.delete("/:id", requireRole(["coach"]), deleteStatController);

export default statRouter;
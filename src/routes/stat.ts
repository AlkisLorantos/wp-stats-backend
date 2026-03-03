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
import { validate } from "../middleware/validate";
import { createStatSchema, createShotSchema, updateStatSchema } from "../validators/stat";

const statRouter = Router({ mergeParams: true });

statRouter.use(authMiddleware);

statRouter.get("/", getGameStatsController);
statRouter.post("/", requireRole(["coach"]), validate(createStatSchema), createStatController);
statRouter.post("/shot", requireRole(["coach"]), validate(createShotSchema), createShotWithLocationController);
statRouter.put("/:id", requireRole(["coach"]), validate(updateStatSchema), updateStatController);
statRouter.delete("/:id", requireRole(["coach"]), deleteStatController);

export default statRouter;
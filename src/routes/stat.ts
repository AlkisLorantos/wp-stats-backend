import { Router } from "express";
import {
  createStat,
  getGameStats,
  deleteStat,
} from "../controllers/stat";

import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const statRouter = Router({ mergeParams: true });

statRouter.use(authMiddleware);

statRouter.get("/", getGameStats);
statRouter.post("/", requireRole(["coach"]), createStat);
statRouter.delete("/:id", requireRole(["coach"]), deleteStat);


export default statRouter;
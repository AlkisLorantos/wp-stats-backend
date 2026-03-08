import { Router } from "express";
import {
  getCompetitionsController,
  getCompetitionController,
  createCompetitionController,
  updateCompetitionController,
  deleteCompetitionController,
} from "../controllers/competition";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();

router.use(authMiddleware);

router.get("/", getCompetitionsController);
router.get("/:id", getCompetitionController);
router.post("/", requireRole(["coach"]), createCompetitionController);
router.put("/:id", requireRole(["coach"]), updateCompetitionController);
router.delete("/:id", requireRole(["coach"]), deleteCompetitionController);

export default router;
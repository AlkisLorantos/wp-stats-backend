import { Router } from "express";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";
import {
  getPresetsController,
  savePresetController,
  getPresetController,
  deletePresetController,
} from "../controllers/rosterPreset";

const router = Router();

router.use(authMiddleware);
router.post("/", requireRole(["coach"]), savePresetController);
router.get("/", getPresetsController);
router.get("/:id", getPresetController);
router.delete("/:id", requireRole(["coach"]), deletePresetController);

export default router;
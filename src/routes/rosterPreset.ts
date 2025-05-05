import { Router } from "express";
import { authMiddleware } from "../middleware/client/auth";
import {
  getPresetsController,
  savePresetController,
  getPresetController,
} from "../controllers/rosterPreset";

const router = Router();

router.use(authMiddleware);
router.post("/", savePresetController);         // Save a new preset
router.get("/", getPresetsController);          // List presets
router.get("/:id", getPresetController);        // Load a preset by ID

export default router;
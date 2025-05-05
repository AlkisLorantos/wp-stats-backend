import { Router } from "express";
import authRoutes from "./client/auth";
import playerRoutes from "./player";
import gameRoutes from "./game";
import statRoutes from "./stat";
import rosterRoutes from "./roster";
import rosterPresetRoutes from './rosterPreset';
import substitutionRoutes from "./substitution";


import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();

// Public routes
router.use("/auth", authRoutes);

// Protected routes (must be authenticated)
router.use(authMiddleware);

router.use("/players", playerRoutes);
router.use("/games", gameRoutes);
router.use("/stats", statRoutes);
router.use("/", rosterRoutes);        
router.use("/presets", rosterPresetRoutes);
router.use("/substitutions", substitutionRoutes);

export default router;
import { Router } from "express";
import authRoutes from "./auth/auth";
import playerRoutes from "./player";
import gameRoutes from "./game";
import rosterPresetRoutes from './rosterPreset';
import { authMiddleware } from "../middleware/client/auth";
import { rateLimitGeneral } from "../middleware/rateLimit";
import competitionRoutes from "./competition";
import teamStatsRoutes from "./teamStats";
import exportRoutes from "./export";

const router = Router();

router.use(rateLimitGeneral);
router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use("/players", playerRoutes);
router.use("/games", gameRoutes);
router.use("/roster-presets", rosterPresetRoutes);
router.use("/competitions", competitionRoutes);
router.use("/team-stats", teamStatsRoutes);
router.use("/export", exportRoutes);

export default router;
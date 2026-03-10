import { Router } from "express";
import authRoutes from "./client/auth";
import playerRoutes from "./player";
import teamRoutes from "./team";
import gameRoutes from "./game";
import rosterPresetRoutes from './rosterPreset';
import { authMiddleware } from "../middleware/client/auth";
import { rateLimitGeneral } from "../middleware/rateLimit";
import competitionRoutes from "./competition";
import teamStatsRoutes from "./teamStats";

const router = Router();

router.use(rateLimitGeneral)

router.use("/auth", authRoutes);

router.use(authMiddleware);

router.use("/players", playerRoutes);
router.use("/teams", teamRoutes)
router.use("/games", gameRoutes);
router.use("/roster-presets", rosterPresetRoutes);
router.use("/competitions", competitionRoutes);
router.use("/team-stats", teamStatsRoutes);


export default router;
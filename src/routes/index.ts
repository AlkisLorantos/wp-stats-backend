import { Router } from "express";
import authRoutes from "./client/auth";
import playerRoutes from "./player";
import teamRoutes from "./team";
import gameRoutes from "./game";
import statRoutes from "./stat";
import rosterRoutes from "./roster";
import rosterPresetRoutes from './rosterPreset';
import substitutionRoutes from "./substitution";
import lineupRoutes from "./lineup";
import globalStatsRoutes from "./globalStats";


import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();

router.use("/auth", authRoutes);

router.use(authMiddleware);

router.use("/players", playerRoutes);
router.use("/teams", teamRoutes)
router.use("/stats", globalStatsRoutes);
router.use("/games", gameRoutes);
router.use("/roster-presets", rosterPresetRoutes);


export default router;
import { Router } from "express";
import { getTeamStatsController } from "../controllers/teamStats";
import { authMiddleware } from "../middleware/client/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", getTeamStatsController);

export default router;
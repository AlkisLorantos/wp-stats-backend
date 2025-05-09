import { Router } from "express";
import { create } from "../controllers/team"; 
import { getTeamStatsController } from "../controllers/stat";

const router: Router = Router();

router.get("/:teamId/stats", getTeamStatsController);

router.post("/", create); 
export default router;

import { Router } from "express";
import { assignRoster, getRoster } from "../controllers/roster";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router();
router.use(authMiddleware);

router.post("/", requireRole(["coach"]), assignRoster);
router.get("/", getRoster);

export default router
import { Router } from "express";
import { assignRoster, getRoster, removeFromRoster } from "../controllers/roster";
import { authMiddleware } from "../middleware/client/auth";
import { requireRole } from "../middleware/client/roles";

const router = Router({ mergeParams: true });
router.use(authMiddleware);

router.post("/", requireRole(["coach"]), assignRoster);
router.get("/", getRoster);
router.delete("/:rosterId", requireRole(["coach"]), removeFromRoster);

export default router;
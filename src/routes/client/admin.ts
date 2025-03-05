import { Router } from "express";
import { updateUserRole } from "../../controllers/client/admin";
import { authMiddleware } from "../../middleware/client/auth";
import { adminOnly } from '../../middleware/client/permissions'

const router = Router();


// router.post("/assign-role", authMiddleware, adminOnly, updateUserRole);
router.post("/assign-role", authMiddleware, adminOnly, updateUserRole);
export default router;

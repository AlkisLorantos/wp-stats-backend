import { Router } from "express";
import { 
  signupTeam, 
  login, 
  logout,
  getUserController,
  updateTeamNameController,
  regenerateApiKeyController,
  deleteUserController,
} from "../../controllers/auth/user";
import { authMiddleware } from "../../middleware/client/auth";
import { rateLimitAuth } from "../../middleware/rateLimit";

const router = Router();

// Auth routes
router.post("/signup", rateLimitAuth, signupTeam);
router.post("/login", rateLimitAuth, login);
router.post("/logout", logout);

// User routes (protected)
router.get("/me", authMiddleware, getUserController);
router.put("/team", authMiddleware, updateTeamNameController);
router.post("/regenerate-api-key", authMiddleware, regenerateApiKeyController);
router.delete("/", authMiddleware, deleteUserController);

export default router;
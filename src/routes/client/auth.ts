import { Router } from "express";
import { signupTeam, login, logout } from "../../controllers/client/auth";
import { authMiddleware, AuthRequest } from "../../middleware/client/auth";
import { Response } from "express";
import { rateLimitAuth } from "../../middleware/rateLimit";

const router = Router();

router.post("/signup", rateLimitAuth, signupTeam)
router.post("/login", rateLimitAuth, login);
router.post("/logout", logout);


router.get(
  "/me",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    res.json({ data: req.user });
  }
);

export default router;
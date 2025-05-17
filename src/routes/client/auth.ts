// in routes/client/auth.ts (or wherever you mount your auth router)
import { Router } from "express";
import { signupTeam, login } from "../../controllers/client/auth";
import { authMiddleware, AuthRequest } from "../../middleware/client/auth";
import { Response } from "express";

const router = Router();

router.post("/signup", signupTeam);
router.post("/login", login);


router.get(
  "/me",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    res.json({ data: req.user });
  }
);

export default router;
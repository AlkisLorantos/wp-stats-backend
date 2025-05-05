import { Router } from "express";
import { login, signupTeam } from "../../controllers/client/auth";

const router = Router();

router.post("/signupteam", signupTeam); 
router.post("/login", login);           

export default router;
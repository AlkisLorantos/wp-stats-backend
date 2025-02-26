import { Router } from "express";
import { create } from "../controllers/team"; 

const router: Router = Router();

router.post("/", create); 
export default router;

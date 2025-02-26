// import express from "express";
// import { create } from '../controllers/league

// const router = express.Router()


// router.post('/league', create);

// export default router;

import express, { Request, Response } from "express";
import { create } from "../controllers/league"; // ✅ Fixed import statement

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await create(req, res);
});

export default router;

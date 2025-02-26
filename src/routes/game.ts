// import express from "express";
// import { create, createStats } from '../controllers/game';

// const router = express.Router()


// router.post('/game', create);
// router.post('/game/stat', createStats);

// export default router;

// // import express from "express";
// // import { create, createStats } from "../controllers/game";

// // const router = express.Router();

// // router.post("/", async (req, res) => await create(req, res));
// // router.post("/stat", async (req, res) => await createStats(req, res));

// // export default router;

import express, { Request, Response } from "express";
import { create, createStats } from "../controllers/game";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await create(req, res);
});

router.post("/stat", async (req: Request, res: Response) => {
    await createStats(req, res);
});

export default router;

import { Router, Request, Response, NextFunction } from "express";
import { register, login } from "../../controllers/client/auth";
// Wrapper function to handle async errors properly
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;



// import express, { Request, Response } from "express";
// import { create, remove } from "../../controllers/client";

// const router = express.Router();

// // Create a user
// router.post("/", async (req: Request, res: Response) => {
//     await create(req, res);
// });

// // Delete a user
// router.delete("/", async (req: Request, res: Response) => {
//     await remove(req, res);
// });

// export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/client/user");
// Wrapper function to handle async errors properly
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
const router = (0, express_1.Router)();
router.post("/register", asyncHandler(user_1.register));
router.post("/login", asyncHandler(user_1.login));
exports.default = router;
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
//# sourceMappingURL=user.js.map
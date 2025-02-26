"use strict";
// import express from "express";
// import { create, createStats } from '../controllers/game';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const game_1 = require("../controllers/game");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    await (0, game_1.create)(req, res);
});
router.post("/stat", async (req, res) => {
    await (0, game_1.createStats)(req, res);
});
exports.default = router;
//# sourceMappingURL=game.js.map
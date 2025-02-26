"use strict";
// import express from "express";
// import { create } from '../controllers/league
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router()
// router.post('/league', create);
// export default router;
const express_1 = __importDefault(require("express"));
const league_1 = require("../controllers/league");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    await (0, league_1.create)(req, res);
});
exports.default = router;
//# sourceMappingURL=league.js.map
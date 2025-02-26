"use strict";
// import { Router } from "express";
// import PlayerRouter from "./player";
// import GameRouter from "./game";
// import TeamRouter from "./team";
// import LeagueRouter from "./league";
// import { authMiddleware } from "middleware/client/auth";
// import { adminOnly } from "middleware/client/permissions";
// // import UserRouter from "./client/user";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// // // Root Test Route
// // router.get("/", (req, res) => {
// //     res.status(200).json({ message: "Welcome to the Water Polo Stats API" });
// // });
// router.use(authMiddleware); // Apply authentication to all routes
// // Read Access (Anyone)
// router.get("/players", PlayerRouter);
// router.get("/games", GameRouter);
// router.get("/teams", TeamRouter);
// router.get("/leagues", LeagueRouter);
// // Write Access (Admin Only)
// router.post("/players", adminOnly, PlayerRouter);
// router.put("/players/:id", adminOnly, PlayerRouter);
// router.delete("/players/:id", adminOnly, PlayerRouter);
// router.post("/games", adminOnly, GameRouter);
// router.put("/games/:id", adminOnly, GameRouter);
// router.delete("/games/:id", adminOnly, GameRouter);
// router.post("/teams", adminOnly, TeamRouter);
// router.put("/teams/:id", adminOnly, TeamRouter);
// router.delete("/teams/:id", adminOnly, TeamRouter);
// router.post("/leagues", adminOnly, LeagueRouter);
// router.put("/leagues/:id", adminOnly, LeagueRouter);
// router.delete("/leagues/:id", adminOnly, LeagueRouter);
// export default router;
const express_1 = require("express");
const user_1 = __importDefault(require("./client/user"));
const admin_1 = __importDefault(require("./client/admin"));
const auth_1 = require("middleware/client/auth");
const permissions_1 = require("middleware/client/permissions");
const player_1 = __importDefault(require("./player"));
const game_1 = __importDefault(require("./game"));
const team_1 = __importDefault(require("./team"));
const league_1 = __importDefault(require("./league"));
// import UserRouter from "./client/user";
const router = (0, express_1.Router)();
router.use("/auth", user_1.default);
router.use("/admin", auth_1.authMiddleware, admin_1.default); //Admin routes require authentication
//Public Read Access
router.get("/players", player_1.default);
router.get("/games", game_1.default);
router.get("/teams", team_1.default);
router.get("/leagues", league_1.default);
//Full Access
router.post("/players", auth_1.authMiddleware, permissions_1.fullAccessOnly, player_1.default);
router.put("/players/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, player_1.default);
router.delete("/players/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, player_1.default);
router.post("/games", auth_1.authMiddleware, permissions_1.fullAccessOnly, game_1.default);
router.put("/games/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, game_1.default);
router.delete("/games/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, game_1.default);
router.post("/teams", auth_1.authMiddleware, permissions_1.fullAccessOnly, team_1.default);
router.put("/teams/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, team_1.default);
router.delete("/teams/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, team_1.default);
router.post("/leagues", auth_1.authMiddleware, permissions_1.fullAccessOnly, league_1.default);
router.put("/leagues/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, league_1.default);
router.delete("/leagues/:id", auth_1.authMiddleware, permissions_1.fullAccessOnly, league_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
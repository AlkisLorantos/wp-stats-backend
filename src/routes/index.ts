import { Router } from "express";
import PlayerRouter from "./player";
import GameRouter from "./game";
import TeamRouter from "./team";
import LeagueRouter from "./league";
// import UserRouter from "./client/user";

const router = Router();

// Root Test Route
router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Water Polo Stats API" });
});

// API Routes
router.use("/api/players", PlayerRouter);
router.use("/api/games", GameRouter);
router.use("/api/teams", TeamRouter);
router.use("/api/leagues", LeagueRouter);
// router.use("/api/users", UserRouter);

export default router;
// import { Router } from "express";
// import PlayerRouter from "./player";
// import GameRouter from "./game";
// import TeamRouter from "./team";
// import LeagueRouter from "./league";
// import { authMiddleware } from "middleware/client/auth";
// import { adminOnly } from "middleware/client/permissions";
// // import UserRouter from "./client/user";

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

// import { Router } from "express";
// import authRoutes from "./client/auth";
// import adminRoutes from "./client/admin";
// import { authMiddleware } from "../middleware/client/auth";
// import { fullAccessOnly } from "../middleware/client/permissions"
// import PlayerRouter from "./player";
// import GameRouter from "./game";
// import TeamRouter from "./team";
// import LeagueRouter from "./league";
// import { adminOnly } from "middleware/client/permissions";
// // import UserRouter from "./client/user";

// const router = Router();

// router.use("/auth", authRoutes);
// router.use("/admin", authMiddleware, adminRoutes); //Admin routes require authentication

// //Public Read Access
// router.get("/players", PlayerRouter);
// router.get("/games", GameRouter);
// router.get("/teams", TeamRouter);
// router.get("/leagues", LeagueRouter);

// //Full Access
// router.post("/players", authMiddleware, fullAccessOnly, PlayerRouter);
// router.put("/players/:id", authMiddleware, fullAccessOnly, PlayerRouter);
// router.delete("/players/:id", authMiddleware, fullAccessOnly, PlayerRouter);

// router.post("/games", authMiddleware, fullAccessOnly, GameRouter);
// router.put("/games/:id", authMiddleware, fullAccessOnly, GameRouter);
// router.delete("/games/:id", authMiddleware, fullAccessOnly, GameRouter);

// router.post("/teams", authMiddleware, fullAccessOnly, TeamRouter);
// router.put("/teams/:id", authMiddleware, fullAccessOnly, TeamRouter);
// router.delete("/teams/:id", authMiddleware, fullAccessOnly, TeamRouter);

// router.post("/leagues", authMiddleware, fullAccessOnly, LeagueRouter);
// router.put("/leagues/:id", authMiddleware, fullAccessOnly, LeagueRouter);
// router.delete("/leagues/:id", authMiddleware, fullAccessOnly, LeagueRouter);

// export default router;
import { Router } from "express";
import authRoutes from "./client/auth";
import adminRoutes from "./client/admin";
import { authMiddleware } from "../middleware/client/auth";
import { fullAccessOnly } from "../middleware/client/permissions";
import PlayerRouter from "./player";
import GameRouter from "./game";
import TeamRouter from "./team";
import LeagueRouter from "./league";
import { adminOnly } from "../middleware/client/permissions"; // Fixed import

const router = Router();

// 🔓 Public Routes (Anyone Can Read)
router.use("/players", PlayerRouter);
router.use("/games", GameRouter);
router.use("/teams", TeamRouter);
router.use("/leagues", LeagueRouter);

// 🔐 Protected Admin Routes
router.use("/auth", authRoutes);
router.use("/admin", authMiddleware, adminRoutes); // Admin routes require authentication

export default router;

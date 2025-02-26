"use strict";
// import express from "express";
// import { create, show, showMany, update, remove } from '../controllers/players/index';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router()
// router.get('/players/:name', show);
// router.get('/players', showMany);
// router.post('/players', create);
// router.put('/players', update);
// router.delete('/players', remove);
// export default router;
// import express from "express";
// import { create, show, showMany, update, remove } from "../controllers/players/index";
// const router = express.Router();
// // Fetch Players
// router.get("/", showMany);
// router.get("/:name", show);
// // Create a Player
// router.post("/", create);
// // Update a Player (Use `:id` in URL)
// router.put("/:id", update);
// // Delete a Player (Use `:id` in URL)
// router.delete("/:id", remove);
// export default router;
// import express from "express";
// import { create, show, showMany, update, remove } from "../controllers/players/index";
// const router = express.Router();
// // Fetch Players
// router.get("/", showMany);
// router.get("/:name", show);
// // Create a Player
// router.post("/", create);
// // Update a Player (Use `:id` in URL)
// router.put("/:id", update);
// // Delete a Player (Use `:id` in URL)
// router.delete("/:id", remove);
// export default router;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/players/index");
const router = express_1.default.Router();
// Fetch all players
router.get("/", async (req, res) => await (0, index_1.showMany)(req, res));
// Fetch a single player
router.get("/:name", async (req, res) => await (0, index_1.show)(req, res));
// Create a player
router.post("/", async (req, res) => await (0, index_1.create)(req, res));
// Update a player
router.put("/:id", async (req, res) => await (0, index_1.update)(req, res));
// Delete a player
router.delete("/:id", async (req, res) => await (0, index_1.remove)(req, res));
exports.default = router;
//# sourceMappingURL=player.js.map
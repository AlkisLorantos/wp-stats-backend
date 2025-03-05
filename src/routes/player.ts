// import express from "express";
// import { create, show, showMany, update, remove } from '../controllers/players/index';

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
import { Router } from "express";
import { create, show, showMany, update, remove } from "../controllers/players";
import { authMiddleware } from "../middleware/client/auth";
import { fullAccessOnly } from "../middleware/client/permissions";

const router = Router();

// 📌 Public: Get Players (No Authentication)
router.get("/", showMany);
router.get("/:id", show);

// 🔐 Protected: Only Authenticated Users Can Create/Update/Delete
router.post("/", authMiddleware, fullAccessOnly, create);
router.put("/:id", authMiddleware, fullAccessOnly, update);
router.delete("/:id", authMiddleware, fullAccessOnly, remove);

export default router;

// import express from "express";
// import { create, show, showMany, update, remove } from "../controllers/players/index";

// const router = express.Router();

// // Fetch all players
// router.get("/", async (req, res) => await showMany(req, res));

// // Fetch a single player
// router.get("/:name", async (req, res) => await show(req, res));

// // Create a player
// router.post("/", async (req, res) => await create(req, res));

// // Update a player
// router.put("/:id", async (req, res) => await update(req, res));

// // Delete a player
// router.delete("/:id", async (req, res) => await remove(req, res));

// export default router;


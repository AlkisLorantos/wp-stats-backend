"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_1 = require("../controllers/player");
const stat_1 = require("../controllers/stat");
const auth_1 = require("../middleware/client/auth");
const roles_1 = require("../middleware/client/roles");
const validate_1 = require("../middleware/validate");
const player_2 = require("../validators/player");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get("/", player_1.getAllPlayers);
router.get("/:id", player_1.getPlayer);
router.get("/:id/stats", stat_1.getPlayerStatsController);
router.post("/", (0, roles_1.requireRole)(["coach"]), (0, validate_1.validate)(player_2.createPlayerSchema), player_1.createPlayerController);
router.put("/:id", (0, roles_1.requireRole)(["coach"]), (0, validate_1.validate)(player_2.updatePlayerSchema), player_1.updatePlayerController);
router.delete("/:id", (0, roles_1.requireRole)(["coach"]), player_1.deletePlayerController);
exports.default = router;
//# sourceMappingURL=player.js.map
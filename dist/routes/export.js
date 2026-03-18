"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const export_1 = require("../controllers/export");
const auth_1 = require("../middleware/client/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get("/players", export_1.exportPlayersController);
router.get("/games", export_1.exportGamesController);
router.get("/stats", export_1.exportStatsController);
exports.default = router;
//# sourceMappingURL=export.js.map
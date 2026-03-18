"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamStats_1 = require("../controllers/teamStats");
const auth_1 = require("../middleware/client/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get("/", teamStats_1.getTeamStatsController);
exports.default = router;
//# sourceMappingURL=teamStats.js.map
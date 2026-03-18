"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lineup_1 = require("../controllers/lineup");
const roles_1 = require("../middleware/client/roles");
const auth_1 = require("../middleware/client/auth");
const router = (0, express_1.Router)({ mergeParams: true });
router.use(auth_1.authMiddleware);
router.post("/", (0, roles_1.requireRole)(["coach"]), lineup_1.saveStartingLineupController);
router.get("/:period", lineup_1.getStartingLineupController);
exports.default = router;
//# sourceMappingURL=lineup.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/client/auth");
const substitution_1 = require("../controllers/substitution");
const roles_1 = require("../middleware/client/roles");
const router = (0, express_1.Router)({ mergeParams: true });
router.use(auth_1.authMiddleware);
router.post("/", (0, roles_1.requireRole)(["coach"]), substitution_1.createSubstitution);
router.get("/", substitution_1.getGameSubstitutions);
router.get("/players/:playerId/playing-time", substitution_1.getPlayerPlayingTime);
exports.default = router;
//# sourceMappingURL=substitution.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roster_1 = require("../controllers/roster");
const auth_1 = require("../middleware/client/auth");
const roles_1 = require("../middleware/client/roles");
const router = (0, express_1.Router)({ mergeParams: true });
router.use(auth_1.authMiddleware);
router.post("/", (0, roles_1.requireRole)(["coach"]), roster_1.assignRoster);
router.get("/", roster_1.getRoster);
router.delete("/:rosterId", (0, roles_1.requireRole)(["coach"]), roster_1.removeFromRoster);
exports.default = router;
//# sourceMappingURL=roster.js.map
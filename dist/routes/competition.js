"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const competition_1 = require("../controllers/competition");
const auth_1 = require("../middleware/client/auth");
const roles_1 = require("../middleware/client/roles");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get("/", competition_1.getCompetitionsController);
router.get("/:id", competition_1.getCompetitionController);
router.post("/", (0, roles_1.requireRole)(["coach"]), competition_1.createCompetitionController);
router.put("/:id", (0, roles_1.requireRole)(["coach"]), competition_1.updateCompetitionController);
router.delete("/:id", (0, roles_1.requireRole)(["coach"]), competition_1.deleteCompetitionController);
exports.default = router;
//# sourceMappingURL=competition.js.map
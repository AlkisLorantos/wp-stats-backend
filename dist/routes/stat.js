"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stat_1 = require("../controllers/stat");
const auth_1 = require("../middleware/client/auth");
const roles_1 = require("../middleware/client/roles");
const validate_1 = require("../middleware/validate");
const stat_2 = require("../validators/stat");
const statRouter = (0, express_1.Router)({ mergeParams: true });
statRouter.use(auth_1.authMiddleware);
statRouter.get("/", stat_1.getGameStatsController);
statRouter.post("/", (0, roles_1.requireRole)(["coach"]), (0, validate_1.validate)(stat_2.createStatSchema), stat_1.createStatController);
statRouter.post("/shot", (0, roles_1.requireRole)(["coach"]), (0, validate_1.validate)(stat_2.createShotSchema), stat_1.createShotWithLocationController);
statRouter.put("/:id", (0, roles_1.requireRole)(["coach"]), (0, validate_1.validate)(stat_2.updateStatSchema), stat_1.updateStatController);
statRouter.delete("/:id", (0, roles_1.requireRole)(["coach"]), stat_1.deleteStatController);
exports.default = statRouter;
//# sourceMappingURL=stat.js.map
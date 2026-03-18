"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/client/auth");
const roles_1 = require("../middleware/client/roles");
const rosterPreset_1 = require("../controllers/rosterPreset");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.post("/", (0, roles_1.requireRole)(["coach"]), rosterPreset_1.savePresetController);
router.get("/", rosterPreset_1.getPresetsController);
router.get("/:id", rosterPreset_1.getPresetController);
router.delete("/:id", (0, roles_1.requireRole)(["coach"]), rosterPreset_1.deletePresetController);
exports.default = router;
//# sourceMappingURL=rosterPreset.js.map
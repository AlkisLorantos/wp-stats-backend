"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../controllers/team");
const router = (0, express_1.Router)();
router.post("/", team_1.create);
exports.default = router;
//# sourceMappingURL=team.js.map
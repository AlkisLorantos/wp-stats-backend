"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("controllers/client/admin");
const auth_1 = require("middleware/client/auth");
const permissions_1 = require("middleware/client/permissions");
const router = (0, express_1.Router)();
router.post("/assign-role", auth_1.authMiddleware, permissions_1.adminOnly, admin_1.updateUserRole);
exports.default = router;
//# sourceMappingURL=admin.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/auth/user");
const auth_1 = require("../../middleware/client/auth");
const rateLimit_1 = require("../../middleware/rateLimit");
const router = (0, express_1.Router)();
// Auth routes
router.post("/signup", rateLimit_1.rateLimitAuth, user_1.signupTeam);
router.post("/login", rateLimit_1.rateLimitAuth, user_1.login);
router.post("/logout", user_1.logout);
// User routes (protected)
router.get("/me", auth_1.authMiddleware, user_1.getUserController);
router.put("/team", auth_1.authMiddleware, user_1.updateTeamNameController);
router.post("/regenerate-api-key", auth_1.authMiddleware, user_1.regenerateApiKeyController);
router.delete("/", auth_1.authMiddleware, user_1.deleteUserController);
exports.default = router;
//# sourceMappingURL=auth.js.map
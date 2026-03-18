"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth/auth"));
const player_1 = __importDefault(require("./player"));
const game_1 = __importDefault(require("./game"));
const rosterPreset_1 = __importDefault(require("./rosterPreset"));
const auth_2 = require("../middleware/client/auth");
const rateLimit_1 = require("../middleware/rateLimit");
const competition_1 = __importDefault(require("./competition"));
const teamStats_1 = __importDefault(require("./teamStats"));
const export_1 = __importDefault(require("./export"));
const router = (0, express_1.Router)();
router.use(rateLimit_1.rateLimitGeneral);
router.use("/auth", auth_1.default);
router.use(auth_2.authMiddleware);
router.use("/players", player_1.default);
router.use("/games", game_1.default);
router.use("/roster-presets", rosterPreset_1.default);
router.use("/competitions", competition_1.default);
router.use("/team-stats", teamStats_1.default);
router.use("/export", export_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
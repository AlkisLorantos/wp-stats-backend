"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameSchema = exports.createGameSchema = void 0;
const zod_1 = require("zod");
exports.createGameSchema = zod_1.z.object({
    opponent: zod_1.z.string().min(1).max(100),
    date: zod_1.z.string().datetime().or(zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    location: zod_1.z.string().max(100).optional(),
    homeOrAway: zod_1.z.enum(["HOME", "AWAY"]).optional(),
});
exports.updateGameSchema = zod_1.z.object({
    opponent: zod_1.z.string().min(1).max(100).optional(),
    date: zod_1.z.string().datetime().or(zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
    location: zod_1.z.string().max(100).optional(),
    homeOrAway: zod_1.z.enum(["HOME", "AWAY"]).optional(),
    teamScore: zod_1.z.number().min(0).optional(),
    opponentScore: zod_1.z.number().min(0).optional(),
});
//# sourceMappingURL=game.js.map
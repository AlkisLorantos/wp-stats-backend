"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatSchema = exports.createShotSchema = exports.createStatSchema = void 0;
const zod_1 = require("zod");
exports.createStatSchema = zod_1.z.object({
    playerId: zod_1.z.number().positive(),
    type: zod_1.z.enum(["GOAL", "SHOT", "STEAL", "BLOCK", "SAVE", "EXCLUSION", "TURNOVER", "ASSIST"]),
    x: zod_1.z.number().optional(),
    y: zod_1.z.number().optional(),
    capNumber: zod_1.z.number().positive().optional(),
    context: zod_1.z.enum(["SIX_ON_SIX", "MAN_UP", "MAN_DOWN", "COUNTER", "PENALTY"]).optional(),
    period: zod_1.z.number().min(1).max(4).optional(),
    clock: zod_1.z.number().min(0).max(8).optional(),
});
exports.createShotSchema = zod_1.z.object({
    playerId: zod_1.z.number().positive(),
    x: zod_1.z.number().min(0).max(25),
    y: zod_1.z.number().min(0).max(20),
    goalX: zod_1.z.number().min(0).max(3).optional(),
    goalY: zod_1.z.number().min(0).max(0.9).optional(),
    shotOutcome: zod_1.z.enum(["GOAL", "SAVED", "MISSED", "BLOCKED", "POST"]),
    assisterId: zod_1.z.number().positive().optional(),
    period: zod_1.z.number().min(1).max(4),
    clock: zod_1.z.number().min(0).max(8),
    context: zod_1.z.enum(["SIX_ON_SIX", "MAN_UP", "MAN_DOWN", "COUNTER", "PENALTY"]).optional(),
});
exports.updateStatSchema = zod_1.z.object({
    playerId: zod_1.z.number().positive().optional(),
    type: zod_1.z.enum(["GOAL", "SHOT", "STEAL", "BLOCK", "SAVE", "EXCLUSION", "TURNOVER", "ASSIST"]).optional(),
    x: zod_1.z.number().optional(),
    y: zod_1.z.number().optional(),
    context: zod_1.z.enum(["SIX_ON_SIX", "MAN_UP", "MAN_DOWN", "COUNTER", "PENALTY"]).optional(),
    period: zod_1.z.number().min(1).max(4).optional(),
    clock: zod_1.z.number().min(0).max(8).optional(),
});
//# sourceMappingURL=stat.js.map
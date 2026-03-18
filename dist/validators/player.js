"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerSchema = exports.createPlayerSchema = void 0;
const zod_1 = require("zod");
exports.createPlayerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
    position: zod_1.z.string().max(50).optional(),
    capNumber: zod_1.z.number().min(1).max(99).optional(),
});
exports.updatePlayerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50).optional(),
    lastName: zod_1.z.string().min(1).max(50).optional(),
    position: zod_1.z.string().max(50).optional(),
    capNumber: zod_1.z.number().min(1).max(99).optional(),
});
//# sourceMappingURL=player.js.map
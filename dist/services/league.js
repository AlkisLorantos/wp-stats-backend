"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLeague = exports.updateLeague = exports.getLeague = exports.createLeague = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createLeague = async (data) => {
    const team = await prisma_1.default.league.create({
        data: Object.assign({}, data),
    });
    return team;
};
exports.createLeague = createLeague;
const getLeague = async (id) => {
    if (id !== null) {
        const league = await prisma_1.default.league.findUnique({
            where: {
                id: id,
            }
        });
        return league;
    }
    ;
    const leagues = await prisma_1.default.league.findMany();
    return leagues;
};
exports.getLeague = getLeague;
const updateLeague = async (id, data) => {
    const league = await prisma_1.default.league.update({
        where: { id: id },
        data: Object.assign({}, data)
    });
    return league;
};
exports.updateLeague = updateLeague;
const removeLeague = async (id) => {
    const league = prisma_1.default.league.delete({
        where: { id: id }
    });
    return league;
};
exports.removeLeague = removeLeague;
//# sourceMappingURL=league.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGameStats = exports.updateGameStats = exports.getGameStat = exports.createGameStat = exports.removeGame = exports.updateGame = exports.getGame = exports.createGame = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const createGame = async (data) => {
    const game = await prisma_1.default.game.create({
        data: Object.assign({}, data),
    });
    return game;
};
exports.createGame = createGame;
const getGame = async (id) => {
    if (id !== null) {
        const game = await prisma_1.default.game.findUnique({
            where: {
                id: id,
            }
        });
        return game;
    }
    ;
    const games = await prisma_1.default.game.findMany();
    return games;
};
exports.getGame = getGame;
const updateGame = async (id, data) => {
    const game = await prisma_1.default.game.update({
        where: { id: id },
        data: Object.assign({}, data)
    });
    return game;
};
exports.updateGame = updateGame;
const removeGame = async (id) => {
    const game = prisma_1.default.game.delete({
        where: { id: id }
    });
    return game;
};
exports.removeGame = removeGame;
const createGameStat = async (data) => {
    const gameStat = await prisma_1.default.gameStat.create({
        data: Object.assign({}, data),
    });
    return gameStat;
};
exports.createGameStat = createGameStat;
const getGameStat = async (id) => {
    if (id !== null) {
        const gameStat = await prisma_1.default.gameStat.findUnique({
            where: {
                id: id,
            }
        });
        return gameStat;
    }
    ;
    const gameStats = await prisma_1.default.gameStat.findMany();
    return gameStats;
};
exports.getGameStat = getGameStat;
const updateGameStats = async (id, data) => {
    const gameStat = await prisma_1.default.gameStat.update({
        where: { id: id },
        data: Object.assign({}, data)
    });
    return gameStat;
};
exports.updateGameStats = updateGameStats;
const removeGameStats = async (id) => {
    const gameStat = prisma_1.default.gameStat.delete({
        where: { id: id }
    });
    return gameStat;
};
exports.removeGameStats = removeGameStats;
//# sourceMappingURL=game.js.map
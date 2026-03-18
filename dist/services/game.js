"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endGame = exports.startGame = exports.deleteGame = exports.updateGame = exports.getGameById = exports.getGames = exports.createGame = void 0;
const prisma_1 = require("../lib/prisma");
const createGame = async ({ date, opponent, location, homeOrAway, teamId, competitionId, }) => {
    return await prisma_1.prisma.game.create({
        data: {
            date,
            opponent,
            location,
            homeOrAway,
            teamId,
            competitionId,
        },
    });
};
exports.createGame = createGame;
const getGames = async (teamId) => {
    return await prisma_1.prisma.game.findMany({
        where: { teamId },
        orderBy: { date: "desc" },
        include: {
            competition: true,
        },
    });
};
exports.getGames = getGames;
const getGameById = async (id, teamId) => {
    return await prisma_1.prisma.game.findFirst({
        where: { id, teamId },
        select: {
            id: true,
            date: true,
            opponent: true,
            location: true,
            homeOrAway: true,
            teamScore: true,
            opponentScore: true,
            period: true,
            status: true,
            team: { select: { name: true } },
            competition: true,
        },
    });
};
exports.getGameById = getGameById;
const updateGame = async (id, teamId, data) => {
    const game = await prisma_1.prisma.game.findFirst({
        where: { id, teamId },
    });
    if (!game)
        throw new Error("Game not found or unauthorized");
    return await prisma_1.prisma.game.update({
        where: { id },
        data: {
            ...data,
            ...(data.date ? { date: new Date(data.date) } : {}),
        },
    });
};
exports.updateGame = updateGame;
const deleteGame = async (id, teamId) => {
    const game = await prisma_1.prisma.game.findFirst({
        where: { id, teamId },
    });
    if (!game)
        throw new Error("Game not found or unauthorized");
    return await prisma_1.prisma.$transaction(async (tx) => {
        await tx.statEvent.deleteMany({ where: { gameId: id } });
        await tx.startingLineup.deleteMany({ where: { gameId: id } });
        await tx.substitution.deleteMany({ where: { gameId: id } });
        await tx.gameRoster.deleteMany({ where: { gameId: id } });
        return await tx.game.delete({ where: { id } });
    });
};
exports.deleteGame = deleteGame;
const startGame = async (id, teamId) => {
    const game = await prisma_1.prisma.game.findFirst({
        where: { id, teamId },
    });
    if (!game)
        throw new Error("Game not found or unauthorized");
    if (game.status === "LIVE")
        throw new Error("Game is already live");
    if (game.status === "ENDED")
        throw new Error("Game is already over");
    const q1Lineup = await prisma_1.prisma.startingLineup.findMany({
        where: { gameId: id, period: 1 },
    });
    if (q1Lineup.length !== 7) {
        throw new Error("Q1 starting lineup must have exactly 7 players");
    }
    return await prisma_1.prisma.game.update({
        where: { id },
        data: { status: "LIVE", period: 1 },
    });
};
exports.startGame = startGame;
const endGame = async (id, teamId) => {
    const game = await prisma_1.prisma.game.findFirst({
        where: { id, teamId },
    });
    if (!game)
        throw new Error("Game not found or unauthorized");
    if (game.status !== "LIVE")
        throw new Error("Game is not live yet");
    return await prisma_1.prisma.game.update({
        where: { id },
        data: { status: "ENDED" },
    });
};
exports.endGame = endGame;
//# sourceMappingURL=game.js.map
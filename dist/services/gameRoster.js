"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRosterForGame = exports.removePlayerFromRoster = exports.addPlayerToRoster = exports.assignRosterToGame = void 0;
const prisma_1 = require("../lib/prisma");
const assignRosterToGame = async (teamId, gameId, roster) => {
    const game = await prisma_1.prisma.game.findFirst({ where: { id: gameId, teamId } });
    if (!game)
        throw new Error("Game not found or unauthorized");
    const teamPlayers = await prisma_1.prisma.player.findMany({
        where: { teamId, id: { in: roster.map(r => r.playerId) } }
    });
    if (teamPlayers.length !== roster.length) {
        throw new Error("One or more players do not belong to your team");
    }
    await prisma_1.prisma.gameRoster.deleteMany({ where: { gameId } });
    const created = await prisma_1.prisma.gameRoster.createMany({
        data: roster.map(player => ({
            gameId,
            playerId: player.playerId,
            capNumber: player.capNumber ?? null,
        }))
    });
    return created;
};
exports.assignRosterToGame = assignRosterToGame;
const addPlayerToRoster = async (teamId, gameId, playerId, capNumber) => {
    const game = await prisma_1.prisma.game.findFirst({ where: { id: gameId, teamId } });
    if (!game)
        throw new Error("Game not found or unauthorized");
    const player = await prisma_1.prisma.player.findFirst({ where: { id: playerId, teamId } });
    if (!player)
        throw new Error("Player not found or does not belong to your team");
    const existing = await prisma_1.prisma.gameRoster.findFirst({
        where: { gameId, OR: [{ playerId }, { capNumber }] }
    });
    if (existing)
        throw new Error("Player or cap number already in roster");
    return prisma_1.prisma.gameRoster.create({
        data: { gameId, playerId, capNumber },
        include: { player: true }
    });
};
exports.addPlayerToRoster = addPlayerToRoster;
const removePlayerFromRoster = async (teamId, gameId, rosterId) => {
    const roster = await prisma_1.prisma.gameRoster.findFirst({
        where: { id: rosterId, gameId },
        include: { game: true }
    });
    if (!roster || roster.game.teamId !== teamId) {
        throw new Error("Roster entry not found or unauthorized");
    }
    return prisma_1.prisma.gameRoster.delete({ where: { id: rosterId } });
};
exports.removePlayerFromRoster = removePlayerFromRoster;
const getRosterForGame = async (gameId, teamId) => {
    const game = await prisma_1.prisma.game.findFirst({ where: { id: gameId, teamId } });
    if (!game)
        throw new Error("Game not found or unauthorized");
    return prisma_1.prisma.gameRoster.findMany({
        where: { gameId },
        include: { player: true },
    });
};
exports.getRosterForGame = getRosterForGame;
//# sourceMappingURL=gameRoster.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartingLineup = exports.saveStartingLineup = void 0;
const prisma_1 = require("../lib/prisma");
const saveStartingLineup = async ({ gameId, period, lineup, }) => {
    if (lineup.length > 7) {
        throw new Error("Starting lineup cannot have more than 7 players.");
    }
    const assignedToRoster = await prisma_1.prisma.gameRoster.findMany({
        where: { gameId },
        select: { playerId: true },
    });
    const assignedToRosterIds = new Set(assignedToRoster.map((a) => a.playerId));
    const lineupIds = lineup.map((p) => p.playerId);
    const invalidIds = lineupIds.filter((id) => !assignedToRosterIds.has(id));
    if (invalidIds.length > 0) {
        throw new Error(`Players with IDs ${invalidIds.join(", ")} are not assigned to the game roster.`);
    }
    await prisma_1.prisma.startingLineup.deleteMany({
        where: { gameId, period },
    });
    return await prisma_1.prisma.startingLineup.createMany({
        data: lineup.map((a) => ({
            gameId,
            period,
            playerId: a.playerId,
        })),
    });
};
exports.saveStartingLineup = saveStartingLineup;
const getStartingLineup = async (gameId, period) => {
    return prisma_1.prisma.startingLineup.findMany({
        where: { gameId, period },
        include: { player: true },
    });
};
exports.getStartingLineup = getStartingLineup;
//# sourceMappingURL=lineup.js.map
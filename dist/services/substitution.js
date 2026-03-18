"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePlayingTime = exports.getSubstitutionsForGame = exports.recordSubstitution = void 0;
const prisma_1 = require("../lib/prisma");
const recordSubstitution = async (teamId, data) => {
    return await prisma_1.prisma.substitution.create({
        data: {
            gameId: data.gameId,
            period: data.period,
            time: data.time,
            playerInId: data.playerInId,
            playerOutId: data.playerOutId || null,
            teamId,
        },
    });
};
exports.recordSubstitution = recordSubstitution;
const getSubstitutionsForGame = async (gameId, teamId) => {
    return await prisma_1.prisma.substitution.findMany({
        where: { gameId, teamId },
        orderBy: { time: "asc" },
        include: {
            playerIn: true,
            playerOut: true,
        },
    });
};
exports.getSubstitutionsForGame = getSubstitutionsForGame;
const calculatePlayingTime = async (gameId, playerId) => {
    let totalTime = 0;
    for (let period = 1; period <= 4; period++) {
        const subs = await prisma_1.prisma.substitution.findMany({
            where: {
                gameId,
                period,
                OR: [
                    { playerInId: playerId },
                    { playerOutId: playerId },
                ],
            },
            orderBy: { time: "desc" },
        });
        const isInStartinglineup = await prisma_1.prisma.startingLineup.findFirst({
            where: { gameId, period, playerId },
        });
        let timeEnteredWater = isInStartinglineup ? 480 : null;
        for (const sub of subs) {
            if (sub.playerInId === playerId) {
                timeEnteredWater = sub.time;
            }
            if (sub.playerOutId === playerId && timeEnteredWater !== null) {
                totalTime += timeEnteredWater - sub.time;
                timeEnteredWater = null;
            }
        }
        if (timeEnteredWater !== null) {
            totalTime += timeEnteredWater;
        }
    }
    return totalTime;
};
exports.calculatePlayingTime = calculatePlayingTime;
//# sourceMappingURL=substitution.js.map
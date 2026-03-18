"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamStats = exports.getPlayerStats = exports.deleteStatEvent = exports.getStatsForGame = exports.updateStatEvent = exports.createGoalWithAssistEvent = exports.createShotWithLocationEvent = exports.createStatEvent = void 0;
const prisma_1 = require("../lib/prisma");
const createStatEvent = async (teamId, data) => {
    const [player, game] = await Promise.all([
        prisma_1.prisma.player.findFirst({ where: { id: data.playerId, teamId } }),
        prisma_1.prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
    ]);
    if (!player || !game)
        throw new Error("Unauthorized or invalid game/player");
    const eventType = data.type.toUpperCase();
    const context = data.context?.toUpperCase();
    return await prisma_1.prisma.$transaction(async (tx) => {
        const ev = await tx.statEvent.create({
            data: {
                type: eventType,
                x: data.x,
                y: data.y,
                capNumber: data.capNumber,
                context: context,
                period: data.period,
                clock: data.clock,
                playerId: data.playerId,
                gameId: data.gameId,
            },
        });
        if (ev.type === "GOAL") {
            await tx.game.update({
                where: { id: game.id },
                data: { teamScore: { increment: 1 } },
            });
        }
        return ev;
    });
};
exports.createStatEvent = createStatEvent;
const createShotWithLocationEvent = async (teamId, data) => {
    const [player, game] = await Promise.all([
        prisma_1.prisma.player.findFirst({ where: { id: data.playerId, teamId } }),
        prisma_1.prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
    ]);
    if (!player || !game)
        throw new Error("Unauthorized or invalid game/player");
    if (data.assisterId) {
        const assister = await prisma_1.prisma.player.findFirst({
            where: { id: data.assisterId, teamId },
        });
        if (!assister)
            throw new Error("Invalid assist player");
    }
    const isGoal = data.shotOutcome === "GOAL";
    const eventType = isGoal ? "GOAL" : "SHOT";
    const context = data.context?.toUpperCase();
    const shotOutcome = data.shotOutcome.toUpperCase();
    return await prisma_1.prisma.$transaction(async (tx) => {
        const shotEvent = await tx.statEvent.create({
            data: {
                type: eventType,
                x: data.x,
                y: data.y,
                goalX: data.goalX,
                goalY: data.goalY,
                shotOutcome: shotOutcome,
                context,
                period: data.period,
                clock: data.clock,
                playerId: data.playerId,
                gameId: data.gameId,
            },
        });
        let assistEvent = null;
        if (isGoal && data.assisterId) {
            assistEvent = await tx.statEvent.create({
                data: {
                    type: "ASSIST",
                    context,
                    period: data.period,
                    clock: data.clock,
                    playerId: data.assisterId,
                    gameId: data.gameId,
                    assistEventId: shotEvent.id,
                },
            });
        }
        if (isGoal) {
            await tx.game.update({
                where: { id: game.id },
                data: { teamScore: { increment: 1 } },
            });
        }
        return { shot: shotEvent, assist: assistEvent };
    });
};
exports.createShotWithLocationEvent = createShotWithLocationEvent;
const createGoalWithAssistEvent = async (teamId, data) => {
    const [scorer, game] = await Promise.all([
        prisma_1.prisma.player.findFirst({ where: { id: data.scorerId, teamId } }),
        prisma_1.prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
    ]);
    if (!scorer || !game)
        throw new Error("Unauthorized or invalid game/player");
    if (data.assisterId) {
        const assister = await prisma_1.prisma.player.findFirst({
            where: { id: data.assisterId, teamId },
        });
        if (!assister)
            throw new Error("Invalid assist player");
    }
    const context = data.context?.toUpperCase();
    return await prisma_1.prisma.$transaction(async (tx) => {
        const goalEvent = await tx.statEvent.create({
            data: {
                type: "GOAL",
                context,
                period: data.period,
                clock: data.clock,
                playerId: data.scorerId,
                gameId: data.gameId,
            },
        });
        let assistEvent = null;
        if (data.assisterId) {
            assistEvent = await tx.statEvent.create({
                data: {
                    type: "ASSIST",
                    context,
                    period: data.period,
                    clock: data.clock,
                    playerId: data.assisterId,
                    gameId: data.gameId,
                    assistEventId: goalEvent.id,
                },
            });
        }
        await tx.game.update({
            where: { id: game.id },
            data: { teamScore: { increment: 1 } },
        });
        return { goal: goalEvent, assist: assistEvent };
    });
};
exports.createGoalWithAssistEvent = createGoalWithAssistEvent;
const updateStatEvent = async (id, teamId, data) => {
    const stat = await prisma_1.prisma.statEvent.findFirst({
        where: { id },
        include: { game: true },
    });
    if (!stat || stat.game.teamId !== teamId) {
        throw new Error("Stat not found or unauthorized");
    }
    const oldType = stat.type;
    const newType = data.type?.toUpperCase();
    return await prisma_1.prisma.$transaction(async (tx) => {
        if (oldType === "GOAL" && newType && newType !== "GOAL") {
            await tx.game.update({
                where: { id: stat.gameId },
                data: { teamScore: { decrement: 1 } },
            });
        }
        if (oldType !== "GOAL" && newType === "GOAL") {
            await tx.game.update({
                where: { id: stat.gameId },
                data: { teamScore: { increment: 1 } },
            });
        }
        const updated = await tx.statEvent.update({
            where: { id },
            data: {
                playerId: data.playerId,
                type: newType || stat.type,
                x: data.x,
                y: data.y,
                context: data.context?.toUpperCase(),
                period: data.period,
                clock: data.clock,
            },
        });
        return updated;
    });
};
exports.updateStatEvent = updateStatEvent;
const getStatsForGame = async (gameId, teamId) => {
    const game = await prisma_1.prisma.game.findFirst({
        where: { id: gameId, teamId },
    });
    if (!game)
        throw new Error("Game not found or unauthorized");
    return await prisma_1.prisma.statEvent.findMany({
        where: { gameId },
        orderBy: { timestamp: "asc" },
        include: {
            player: { select: { id: true, name: true, capNumber: true } },
        },
    });
};
exports.getStatsForGame = getStatsForGame;
const deleteStatEvent = async (id, teamId) => {
    const stat = await prisma_1.prisma.statEvent.findFirst({
        where: { id },
        include: { game: true },
    });
    if (!stat || stat.game.teamId !== teamId) {
        throw new Error("Unauthorized or stat not found");
    }
    return await prisma_1.prisma.$transaction(async (tx) => {
        await tx.statEvent.deleteMany({
            where: { assistEventId: id },
        });
        if (stat.type === "GOAL") {
            await tx.game.update({
                where: { id: stat.gameId },
                data: { teamScore: { decrement: 1 } },
            });
        }
        return await tx.statEvent.delete({ where: { id } });
    });
};
exports.deleteStatEvent = deleteStatEvent;
const getPlayerStats = async (playerId, teamId) => {
    const player = await prisma_1.prisma.player.findFirst({
        where: { id: playerId, teamId },
    });
    if (!player)
        throw new Error("Player not found or unauthorized");
    const events = await prisma_1.prisma.statEvent.findMany({
        where: { playerId },
    });
    const stats = {
        goals: 0,
        assists: 0,
        shots: 0,
        steals: 0,
        blocks: 0,
        saves: 0,
        exclusions: 0,
        turnovers: 0,
    };
    for (const event of events) {
        if (event.type === "GOAL") {
            stats.goals++;
            stats.shots++;
        }
        else if (event.type === "SHOT") {
            stats.shots++;
        }
        else if (event.type === "ASSIST") {
            stats.assists++;
        }
        else if (event.type === "STEAL") {
            stats.steals++;
        }
        else if (event.type === "BLOCK") {
            stats.blocks++;
        }
        else if (event.type === "SAVE") {
            stats.saves++;
        }
        else if (event.type === "EXCLUSION") {
            stats.exclusions++;
        }
        else if (event.type === "TURNOVER") {
            stats.turnovers++;
        }
    }
    return stats;
};
exports.getPlayerStats = getPlayerStats;
const getTeamStats = async (teamId) => {
    return await prisma_1.prisma.statEvent.findMany({
        where: { player: { teamId } },
        orderBy: { timestamp: "desc" },
    });
};
exports.getTeamStats = getTeamStats;
//# sourceMappingURL=stat.js.map
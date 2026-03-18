"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.updatePlayer = exports.getPlayerById = exports.getPlayers = exports.createPlayer = void 0;
const prisma_1 = require("../lib/prisma");
const createPlayer = async (teamId, data) => {
    if (data.capNumber) {
        const existing = await prisma_1.prisma.player.findFirst({
            where: { teamId, capNumber: data.capNumber },
        });
        if (existing) {
            throw new Error(`Cap number ${data.capNumber} is already assigned to ${existing.name}`);
        }
    }
    return await prisma_1.prisma.player.create({
        data: {
            firstName: data.firstName.toUpperCase(),
            lastName: data.lastName.toUpperCase(),
            capNumber: data.capNumber ?? undefined,
            position: data.position ? data.position.toUpperCase() : undefined,
            name: `${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`,
            team: {
                connect: { id: teamId },
            },
        },
    });
};
exports.createPlayer = createPlayer;
const getPlayers = async (teamId) => {
    return await prisma_1.prisma.player.findMany({
        where: { teamId },
    });
};
exports.getPlayers = getPlayers;
const getPlayerById = async (id, teamId) => {
    const player = await prisma_1.prisma.player.findFirst({
        where: { id, teamId },
        include: {
            stats: {
                include: {
                    game: true,
                },
            },
        },
    });
    if (!player)
        return null;
    const totals = {
        goals: 0,
        shots: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        exclusions: 0,
    };
    const gamesMap = new Map();
    for (const stat of player.stats) {
        if (!stat.game)
            continue;
        const gameId = stat.gameId;
        if (!gamesMap.has(gameId)) {
            gamesMap.set(gameId, {
                gameId,
                date: stat.game.date,
                opponent: stat.game.opponent,
                goals: 0,
                shots: 0,
                assists: 0,
                steals: 0,
                blocks: 0,
                exclusions: 0,
            });
        }
        const gameStats = gamesMap.get(gameId);
        switch (stat.type) {
            case "GOAL":
                gameStats.goals++;
                gameStats.shots++;
                totals.goals++;
                totals.shots++;
                break;
            case "SHOT":
                gameStats.shots++;
                totals.shots++;
                break;
            case "ASSIST":
                gameStats.assists++;
                totals.assists++;
                break;
            case "STEAL":
                gameStats.steals++;
                totals.steals++;
                break;
            case "BLOCK":
                gameStats.blocks++;
                totals.blocks++;
                break;
            case "EXCLUSION":
                gameStats.exclusions++;
                totals.exclusions++;
                break;
        }
    }
    return {
        ...player,
        totals,
        games: Array.from(gamesMap.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    };
};
exports.getPlayerById = getPlayerById;
const updatePlayer = async (id, teamId, data) => {
    const player = await prisma_1.prisma.player.findFirst({
        where: { id, teamId },
    });
    if (!player)
        throw new Error("Player not found or unauthorized");
    if (data.capNumber) {
        const existing = await prisma_1.prisma.player.findFirst({
            where: {
                teamId,
                capNumber: data.capNumber,
                id: { not: id },
            },
        });
        if (existing) {
            throw new Error(`Cap number ${data.capNumber} is already assigned to ${existing.name}`);
        }
    }
    return await prisma_1.prisma.player.update({
        where: { id },
        data: {
            ...(data.firstName && data.lastName
                ? {
                    firstName: data.firstName.toUpperCase(),
                    lastName: data.lastName.toUpperCase(),
                    name: `${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`,
                }
                : {}),
            ...(data.position ? { position: data.position.toUpperCase() } : {}),
            ...(data.capNumber !== undefined ? { capNumber: data.capNumber } : {}),
        },
    });
};
exports.updatePlayer = updatePlayer;
const deletePlayer = async (id, teamId) => {
    const player = await prisma_1.prisma.player.findFirst({
        where: { id, teamId },
    });
    if (!player)
        throw new Error("Player not found or unauthorized");
    return await prisma_1.prisma.player.delete({ where: { id } });
};
exports.deletePlayer = deletePlayer;
//# sourceMappingURL=player.js.map
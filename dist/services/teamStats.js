"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamStats = void 0;
const prisma_1 = require("../lib/prisma");
const getTeamStats = async (teamId) => {
    const [events, games, players] = await Promise.all([
        prisma_1.prisma.statEvent.findMany({
            where: { player: { teamId } },
            include: { player: true, game: true },
        }),
        prisma_1.prisma.game.findMany({
            where: { teamId, status: "ENDED" },
        }),
        prisma_1.prisma.player.findMany({
            where: { teamId },
        }),
    ]);
    const totals = {
        goals: 0,
        assists: 0,
        shots: 0,
        steals: 0,
        blocks: 0,
        saves: 0,
        exclusions: 0,
        turnovers: 0,
    };
    const playerStats = {};
    for (const player of players) {
        playerStats[player.id] = {
            playerId: player.id,
            name: player.name,
            goals: 0,
            assists: 0,
            shots: 0,
            steals: 0,
            blocks: 0,
            saves: 0,
            exclusions: 0,
            turnovers: 0,
        };
    }
    for (const event of events) {
        const ps = playerStats[event.playerId];
        if (!ps)
            continue;
        if (event.type === "GOAL") {
            totals.goals++;
            totals.shots++;
            ps.goals++;
            ps.shots++;
        }
        else if (event.type === "SHOT") {
            totals.shots++;
            ps.shots++;
        }
        else if (event.type === "ASSIST") {
            totals.assists++;
            ps.assists++;
        }
        else if (event.type === "STEAL") {
            totals.steals++;
            ps.steals++;
        }
        else if (event.type === "BLOCK") {
            totals.blocks++;
            ps.blocks++;
        }
        else if (event.type === "SAVE") {
            totals.saves++;
            ps.saves++;
        }
        else if (event.type === "EXCLUSION") {
            totals.exclusions++;
            ps.exclusions++;
        }
        else if (event.type === "TURNOVER") {
            totals.turnovers++;
            ps.turnovers++;
        }
    }
    const wins = games.filter((g) => g.teamScore > g.opponentScore).length;
    const losses = games.filter((g) => g.teamScore < g.opponentScore).length;
    const draws = games.filter((g) => g.teamScore === g.opponentScore).length;
    const goalsFor = games.reduce((sum, g) => sum + g.teamScore, 0);
    const goalsAgainst = games.reduce((sum, g) => sum + g.opponentScore, 0);
    const playerList = Object.values(playerStats);
    const topScorers = [...playerList].sort((a, b) => b.goals - a.goals).slice(0, 5);
    const topAssisters = [...playerList].sort((a, b) => b.assists - a.assists).slice(0, 5);
    const topShooters = [...playerList]
        .filter((p) => p.shots >= 5)
        .map((p) => ({ ...p, shootingPct: Math.round((p.goals / p.shots) * 100) }))
        .sort((a, b) => b.shootingPct - a.shootingPct)
        .slice(0, 5);
    return {
        totals,
        record: {
            wins,
            losses,
            draws,
            gamesPlayed: games.length,
            winPct: games.length > 0 ? Math.round((wins / games.length) * 100) : 0,
            goalsFor,
            goalsAgainst,
            goalDiff: goalsFor - goalsAgainst,
        },
        averages: {
            goalsPerGame: games.length > 0 ? (totals.goals / games.length).toFixed(1) : "0",
            shotsPerGame: games.length > 0 ? (totals.shots / games.length).toFixed(1) : "0",
            shootingPct: totals.shots > 0 ? Math.round((totals.goals / totals.shots) * 100) : 0,
        },
        topScorers,
        topAssisters,
        topShooters,
        allPlayers: playerList,
    };
};
exports.getTeamStats = getTeamStats;
//# sourceMappingURL=teamStats.js.map
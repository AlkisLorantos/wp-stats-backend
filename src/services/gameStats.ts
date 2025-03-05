// import prisma from "./prisma";

// // ✅ Function to update team stats based on player stats
// const updateTeamStats = async (gameId: number) => {
//     const gameStats = await prisma.gameStat.findMany({ where: { gameId } });

//     let homeShots = 0, awayShots = 0;
//     let homeMisses = 0, awayMisses = 0;
//     let homeExclusions = 0, awayExclusions = 0;
//     let homeTurnovers = 0, awayTurnovers = 0;
//     let homeScore = 0, awayScore = 0;

//     const game = await prisma.game.findUnique({ where: { id: gameId } });

//     if (!game) return;

//     for (const stat of gameStats) {
//         const player = await prisma.player.findUnique({ where: { id: stat.playerId } });

//         if (!player) continue;

//         const isHomeTeam = player.teamId === game.homeTeamId;

//         if (isHomeTeam) {
//             homeShots += stat.shotsScored + stat.shotsMissed;
//             homeMisses += stat.shotsMissed;
//             homeExclusions += stat.exclusions;
//             homeTurnovers += stat.turnovers;
//             homeScore += stat.shotsScored;
//         } else {
//             awayShots += stat.shotsScored + stat.shotsMissed;
//             awayMisses += stat.shotsMissed;
//             awayExclusions += stat.exclusions;
//             awayTurnovers += stat.turnovers;
//             awayScore += stat.shotsScored;
//         }
//     }

//     // ✅ Update Game with aggregated team stats
//     await prisma.game.update({
//         where: { id: gameId },
//         data: {
//             homeTeamShots: homeShots,
//             awayTeamShots: awayShots,
//             homeTeamMisses: homeMisses,
//             awayTeamMisses: awayMisses,
//             homeTeamExclusions: homeExclusions,
//             awayTeamExclusions: awayExclusions,
//             homeTeamTurnovers: homeTurnovers,
//             awayTeamTurnovers: awayTurnovers,
//             homeTeamScore: homeScore,
//             awayTeamScore: awayScore
//         }
//     });
// };

// // ✅ Function to record player stats and trigger team stats update
// export const recordGameStats = async (
//     playerId: number,
//     gameId: number,
//     { shotsScored = 0, shotsMissed = 0, assists = 0, exclusions = 0, turnovers = 0 }
// ) => {
//     const existingStat = await prisma.gameStat.findFirst({ where: { playerId, gameId } });

//     if (existingStat) {
//         await prisma.gameStat.update({
//             where: { id: existingStat.id },
//             data: {
//                 shotsScored: existingStat.shotsScored + shotsScored,
//                 shotsMissed: existingStat.shotsMissed + shotsMissed,
//                 assists: existingStat.assists + assists,
//                 exclusions: existingStat.exclusions + exclusions,
//                 turnovers: existingStat.turnovers + turnovers
//             },
//         });
//     } else {
//         await prisma.gameStat.create({
//             data: { playerId, gameId, shotsScored, shotsMissed, assists, exclusions, turnovers },
//         });
//     }

//     await updateTeamStats(gameId);
// };

// // ✅ Get all stats for a game
// export const getGameStats = async (gameId: number) => {
//     return await prisma.game.findUnique({
//         where: { id: gameId },
//         include: { gameStats: true },
//     });
// };

// // ✅ Get all stats for a specific player
// export const getPlayerStats = async (playerId: number) => {
//     return await prisma.gameStat.findMany({ where: { playerId } });
// };

// // ✅ Reset stats for a game (useful for corrections)
// export const resetGameStats = async (gameId: number) => {
//     await prisma.gameStat.deleteMany({ where: { gameId } });
//     await updateTeamStats(gameId);
// };

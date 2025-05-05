import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Assign players with cap numbers to a game
export const assignRosterToGame = async (
  teamId: number,
  gameId: number,
  roster: { playerId: number; capNumber?: number }[]
) => {
  const game = await prisma.game.findFirst({ where: { id: gameId, teamId } });
  if (!game) throw new Error("Game not found or unauthorized");

  // Ensure all players belong to the team
  const teamPlayers = await prisma.player.findMany({
    where: { teamId, id: { in: roster.map(r => r.playerId) } }
  });

  if (teamPlayers.length !== roster.length) {
    throw new Error("One or more players do not belong to your team");
  }

  // Remove existing roster first (optional: for full reset)
  await prisma.gameRoster.deleteMany({ where: { gameId } });

  const created = await prisma.gameRoster.createMany({
    data: roster.map(player => ({
      gameId,
      playerId: player.playerId,
      capNumber: player.capNumber ?? null,
    }))
  });

  return created;
};

// Get game roster with cap numbers
export const getRosterForGame = async (gameId: number, teamId: number) => {
  const game = await prisma.game.findFirst({ where: { id: gameId, teamId } });
  if (!game) throw new Error("Game not found or unauthorized");

  return prisma.gameRoster.findMany({
    where: { gameId },
    include: { player: true },
  });
};
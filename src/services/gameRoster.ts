import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const assignRosterToGame = async (
  teamId: number,
  gameId: number,
  roster: { playerId: number; capNumber?: number }[]
) => {
  const game = await prisma.game.findFirst({ where: { id: gameId, teamId } });
  if (!game) throw new Error("Game not found or unauthorized");

  const teamPlayers = await prisma.player.findMany({
    where: { teamId, id: { in: roster.map(r => r.playerId) } }
  });

  if (teamPlayers.length !== roster.length) {
    throw new Error("One or more players do not belong to your team");
  }

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

export const addPlayerToRoster = async (
  teamId: number,
  gameId: number,
  playerId: number,
  capNumber: number
) => {
  const game = await prisma.game.findFirst({ where: { id: gameId, teamId } });
  if (!game) throw new Error("Game not found or unauthorized");

  const player = await prisma.player.findFirst({ where: { id: playerId, teamId } });
  if (!player) throw new Error("Player not found or does not belong to your team");

  const existing = await prisma.gameRoster.findFirst({
    where: { gameId, OR: [{ playerId }, { capNumber }] }
  });
  if (existing) throw new Error("Player or cap number already in roster");

  return prisma.gameRoster.create({
    data: { gameId, playerId, capNumber },
    include: { player: true }
  });
};

export const removePlayerFromRoster = async (
  teamId: number,
  gameId: number,
  rosterId: number
) => {
  const roster = await prisma.gameRoster.findFirst({
    where: { id: rosterId, gameId },
    include: { game: true }
  });

  if (!roster || roster.game.teamId !== teamId) {
    throw new Error("Roster entry not found or unauthorized");
  }

  return prisma.gameRoster.delete({ where: { id: rosterId } });
};

export const getRosterForGame = async (gameId: number, teamId: number) => {
  const game = await prisma.game.findFirst({ where: { id: gameId, teamId } });
  if (!game) throw new Error("Game not found or unauthorized");

  return prisma.gameRoster.findMany({
    where: { gameId },
    include: { player: true },
  });
};
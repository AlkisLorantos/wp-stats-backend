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

  console.log("🧹 Deleting old roster for game:", gameId);
  await prisma.gameRoster.deleteMany({ where: { gameId } });

  const created = await prisma.gameRoster.createMany({
    data: roster.map(player => ({
      gameId,
      playerId: player.playerId,
      capNumber: player.capNumber ?? null,
    }))
  });
  console.log("Final Roster Inserted:", created);
  return created;
};


export const getRosterForGame = async (gameId: number, teamId: number) => {
  const game = await prisma.game.findFirst({ where: { id: gameId, teamId } });
  if (!game) throw new Error("Game not found or unauthorized");

  return prisma.gameRoster.findMany({
    where: { gameId },
    include: { player: true },
  });
};
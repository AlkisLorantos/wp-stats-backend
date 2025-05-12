import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveStartingLineup = async ({
  gameId,
  period,
  lineup,
}: {
  gameId: number;
  period: number;
  lineup: { playerId: number }[];
}) => {

  if (lineup.length > 7) {
    throw new Error("Starting lineup cannot have more than 7 players.");
  }

  const assignedToRoster = await prisma.gameRoster.findMany({
    where: { gameId },
    select: { playerId: true },
  });

  const assignedToRosterIds = new Set(assignedToRoster.map((a) => a.playerId));
  const lineupIds = lineup.map((p) => p.playerId);
  const invalidIds = lineupIds.filter((id) => !assignedToRosterIds.has(id));

  if (invalidIds.length > 0) {
    throw new Error(
      `Players with IDs ${invalidIds.join(", ")} are not assigned to the game roster.`
    );
  }

  await prisma.startingLineup.deleteMany({
    where: { gameId, period },
  });

  
  return await prisma.startingLineup.createMany({
    data: lineup.map((a) => ({
      gameId,
      period,
      playerId: a.playerId,
    })),
  });
};


export const getStartingLineup = async (gameId: number, period: number) => {
    return prisma.startingLineup.findMany({
      where: { gameId, period },
      include: { player: true }, 
    });
  };
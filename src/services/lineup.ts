import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveStartingLineup = async ({
  gameId,
  period,
  assignments,
}: {
  gameId: number;
  period: number;
  assignments: { playerId: number }[];
}) => {

  if (assignments.length > 7) {
    throw new Error("Starting lineup cannot have more than 7 players.");
  }

  // Clear existing starting lineup for this game and period
  await prisma.startingLineup.deleteMany({
    where: { gameId, period },
  });

  
  return await prisma.startingLineup.createMany({
    data: assignments.map((a) => ({
      gameId,
      period,
      playerId: a.playerId,
    })),
  });
};


export const getStartingLineup = async (gameId: number, period: number) => {
    return prisma.startingLineup.findMany({
      where: { gameId, period },
      include: { player: true }, // optional: include player details
    });
  };
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Save a substitution
export const recordSubstitution = async (
  teamId: number,
  data: {
    gameId: number;
    period: number;
    time: number;
    playerInId: number;
    playerOutId?: number;
  }
) => {
  // Optional: validate team/player ownership

  return await prisma.substitution.create({
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

// Get substitutions for a game
export const getSubstitutionsForGame = async (gameId: number, teamId: number) => {
  return await prisma.substitution.findMany({
    where: { gameId, teamId },
    orderBy: { time: "asc" },
    include: {
      playerIn: true,
      playerOut: true,
    },
  });
};
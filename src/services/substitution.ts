import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


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


export const calculatePlayingTime = async (gameId: number, playerId: number) => {
  let totalTime = 0;

  for (let period = 1; period <= 4; period++) {
    const subs = await prisma.substitution.findMany({
      where: {
        gameId,
        period,
        OR: [
          { playerInId: playerId },
          { playerOutId: playerId },
        ],
      },
      orderBy: { time: "desc" },
    });

    const isInStartinglineup = await prisma.startingLineup.findFirst({
      where: { gameId, period, playerId },
    }); 

  let timeEnteredWater: number | null = isInStartinglineup ? 480 : null;

  for (const sub of subs) {
    if (sub.playerInId === playerId) {
      timeEnteredWater = sub.time;
    } 
    if (sub.playerOutId === playerId && timeEnteredWater !== null) {
      totalTime += timeEnteredWater - sub.time;
      timeEnteredWater = null;
    }
  }

  if (timeEnteredWater !== null) {
    totalTime += timeEnteredWater;
  }
  }
  return totalTime;
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


type StatInput = {
    gameId: number;
    playerId: number;
    type: string;
    x?: number;
    y?: number;
    capNumber?: number;
    context?: string;
    period?: number;
    clock?: number;
  };
  
  export const createStatEvent = async (
    teamId: number,
    data: StatInput
  ) => {

    const [player, game] = await Promise.all([
      prisma.player.findFirst({ where: { id: data.playerId, teamId } }),
      prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
    ]);
  
    if (!player || !game) {
      throw new Error("Unauthorized or invalid game/player");
    }
  

    return await prisma.statEvent.create({
      data: {
        type: data.type.toLowerCase(),
        x: data.x,
        y: data.y,
        capNumber: data.capNumber,
        context: data.context?.toLowerCase(),
        period: data.period,
        clock: data.clock,
        playerId: data.playerId,
        gameId: data.gameId,
      },
    });
  };

export const getStatsForGame = async (gameId: number, teamId: number) => {

  const game = await prisma.game.findFirst({
     where: { id: gameId, teamId },
  });
  if (!game) throw new Error("Game not found or unauthorized");

  return await prisma.statEvent.findMany({
    where: { gameId },
    orderBy: { timestamp: "asc" },
    include: {
      player: { select: { id: true, name: true, capNumber: true}},
    },
  });
};


export const deleteStatEvent = async (id: number, teamId: number) => {
  const stat = await prisma.statEvent.findFirst({
    where: { id },
    include: { game: true },
  });

  if (!stat || stat.game.teamId !== teamId) {
    throw new Error("Unauthorized or stat not found");
  }

  return await prisma.statEvent.delete({ where: { id } });
};

export const getPlayerStats = async (playerId: number) => {
  return await prisma.statEvent.findMany({
    where: { playerId },
    orderBy: { timestamp: "desc" },
  });
};

export const getTeamStats = async (teamId: number) => {
  return await prisma.statEvent.findMany({
    where: { player: { teamId } },
    orderBy: { timestamp: "desc" },
  });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const createGame = async ({
  date,
  opponent,
  location,
  homeOrAway,
  teamId,
}: {
  date: Date;
  opponent: string;
  location?: string;
  homeOrAway: "home" | "away";
  teamId: number;
}) => {
  return await prisma.game.create({
    data: {
      date,
      opponent,
      location,
      homeOrAway,
      teamId,
    },
  });
};

export const getGames = async (teamId: number) => {
  return await prisma.game.findMany({
    where: { teamId },
    orderBy: { date: "desc" },
  });
};

export const getGameById = async (id: number, teamId: number) => {
  return await prisma.game.findFirst({
    where: { id, teamId },
    select: {
      id: true,
      date: true,
      opponent: true,
      teamScore: true,
      opponentScore: true,
      period: true,
      status: true,
      team: { select: { name: true } }
    }
  });
};


export const updateGame = async (
  id: number,
  teamId: number,
  data: {
    date?: string;
    opponent?: string;
    location?: string;
    homeOrAway?: "home" | "away";
    teamScore?: number;
    opponentScore?: number;
  }
) => {
  const game = await prisma.game.findFirst({
    where: { id, teamId },
  });

  if (!game) throw new Error("Game not found or unauthorized");

  return await prisma.game.update({
    where: { id },
    data: {
      ...data,
      ...(data.date ? { date: new Date(data.date) } : {}),
    },
  });
};


export const deleteGame = async (id: number, teamId: number) => {
  const game = await prisma.game.findFirst({
    where: { id, teamId },
  });

  if (!game) throw new Error("Game not found or unauthorized");

  return await prisma.game.delete({
    where: { id },
  });
};


export const startGame = async (id: number, ) => {
  const game = await prisma.game.findUnique({ where: { id, }})

  if (game.status === 'LIVE') throw new Error("Game is already live");
  if (game.status === 'ENDED') throw new Error("Game is already over");


  return await prisma.game.update({
    where: { id },
    data: { status: 'LIVE'}
  });
};

export const endGame = async (id: number, ) => {
  const game = await prisma.game.findUnique({ where: { id }})

  if (game.status !== 'LIVE') throw new Error("Game is not live yet");

  return await prisma.game.update({
    where: { id },
    data: { status: 'ENDED'}
  })
}
import { prisma } from "../lib/prisma";

export const createGame = async ({
  date,
  opponent,
  location,
  homeOrAway,
  teamId,
  competitionId,
}: {
  date: Date;
  opponent: string;
  location?: string;
  homeOrAway?: "home" | "away";
  teamId: number;
  competitionId?: number;
}) => {
  return await prisma.game.create({
    data: {
      date,
      opponent,
      location,
      homeOrAway,
      teamId,
      competitionId,
    },
  });
};

export const getGames = async (teamId: number) => {
  return await prisma.game.findMany({
    where: { teamId },
    orderBy: { date: "desc" },
    include: {
      competition: true,
    },
  });
};

export const getGameById = async (id: number, teamId: number) => {
  return await prisma.game.findFirst({
    where: { id, teamId },
    select: {
      id: true,
      date: true,
      opponent: true,
      location: true,
      homeOrAway: true,
      teamScore: true,
      opponentScore: true,
      period: true,
      status: true,
      team: { select: { name: true } },
      competition: true,
    },
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

  return await prisma.$transaction(async (tx) => {

    await tx.statEvent.deleteMany({ where: { gameId: id } });
    await tx.startingLineup.deleteMany({ where: { gameId: id } });
    await tx.substitution.deleteMany({ where: { gameId: id } });
    await tx.gameRoster.deleteMany({ where: { gameId: id } });

    return await tx.game.delete({ where: { id } });
  });
};

export const startGame = async (id: number, teamId: number) => {
  const game = await prisma.game.findFirst({
    where: { id, teamId },
  });

  if (!game) throw new Error("Game not found or unauthorized");
  if (game.status === "LIVE") throw new Error("Game is already live");
  if (game.status === "ENDED") throw new Error("Game is already over");

  const q1Lineup = await prisma.startingLineup.findMany({
    where: { gameId: id, period: 1 },
  });

  if (q1Lineup.length !== 7) {
    throw new Error("Q1 starting lineup must have exactly 7 players");
  }

  return await prisma.game.update({
    where: { id },
    data: { status: "LIVE", period: 1 },
  });
};

export const endGame = async (id: number, teamId: number) => {
  const game = await prisma.game.findFirst({
    where: { id, teamId },
  });

  if (!game) throw new Error("Game not found or unauthorized");
  if (game.status !== "LIVE") throw new Error("Game is not live yet");

  return await prisma.game.update({
    where: { id },
    data: { status: "ENDED" },
  });
};
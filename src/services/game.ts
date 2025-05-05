import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE GAME
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

// GET ALL GAMES
export const getGames = async (teamId: number) => {
  return await prisma.game.findMany({
    where: { teamId },
    orderBy: { date: "desc" },
  });
};

// GET ONE GAME
export const getGameById = async (id: number, teamId: number) => {
  return await prisma.game.findFirst({
    where: { id, teamId },
  });
};

// UPDATE GAME
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

// DELETE GAME
export const deleteGame = async (id: number, teamId: number) => {
  const game = await prisma.game.findFirst({
    where: { id, teamId },
  });

  if (!game) throw new Error("Game not found or unauthorized");

  return await prisma.game.delete({
    where: { id },
  });
};
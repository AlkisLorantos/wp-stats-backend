import { prisma } from "../lib/prisma";

export const getCompetitions = async (teamId: number) => {
  return await prisma.competition.findMany({
    where: { teamId },
    orderBy: { name: "asc" },
  });
};

export const getCompetitionById = async (id: number, teamId: number) => {
  return await prisma.competition.findFirst({
    where: { id, teamId },
    include: {
      games: {
        orderBy: { date: "desc" },
      },
    },
  });
};

export const createCompetition = async (
  teamId: number,
  data: { name: string; type?: string; season?: string }
) => {
  return await prisma.competition.create({
    data: {
      name: data.name,
      type: data.type,
      season: data.season,
      teamId,
    },
  });
};

export const updateCompetition = async (
  id: number,
  teamId: number,
  data: { name?: string; type?: string; season?: string }
) => {
  const competition = await prisma.competition.findFirst({
    where: { id, teamId },
  });

  if (!competition) throw new Error("Competition not found or unauthorized");

  return await prisma.competition.update({
    where: { id },
    data,
  });
};

export const deleteCompetition = async (id: number, teamId: number) => {
  const competition = await prisma.competition.findFirst({
    where: { id, teamId },
  });

  if (!competition) throw new Error("Competition not found or unauthorized");

  return await prisma.competition.delete({
    where: { id },
  });
};
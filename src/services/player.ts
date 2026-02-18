import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPlayer = async (
  teamId: number,
  data: {
    firstName: string;
    lastName: string;
    capNumber?: number;
    position?: string;
  }
) => {
  return await prisma.player.create({
    data: {
      firstName: data.firstName.toUpperCase(),
      lastName: data.lastName.toUpperCase(),
      capNumber: data.capNumber ?? undefined,
      position: data.position ? data.position.toUpperCase() : undefined,
      name: `${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`,
      team: {
        connect: { id: teamId },
      },
    },
  });
};


export const getPlayers = async (teamId: number) => {
  return await prisma.player.findMany({
    where: { teamId },
  });
};

export const getPlayerById = async (id: number, teamId: number) => {
  const player = await prisma.player.findFirst({
    where: { id, teamId },
    include: {
      stats: {
        include: {
          game: true,
        },
      },
    },
  });

  if (!player) return null;

  const totals = {
    goals: 0,
    shots: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    exclusions: 0,
  };

  const gamesMap = new Map<number, {
    gameId: number;
    date: Date;
    opponent: string;
    goals: number;
    shots: number;
    assists: number;
    steals: number;
    blocks: number;
    exclusions: number;
  }>();

  for (const stat of player.stats) {
    if (!stat.game) continue;

    const gameId = stat.gameId;

    if (!gamesMap.has(gameId)) {
      gamesMap.set(gameId, {
        gameId,
        date: stat.game.date,
        opponent: stat.game.opponent,
        goals: 0,
        shots: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        exclusions: 0,
      });
    }

    const gameStats = gamesMap.get(gameId)!;

    switch (stat.type) {
      case "GOAL":
        gameStats.goals++;
        gameStats.shots++;
        totals.goals++;
        totals.shots++;
        break;
      case "SHOT":
        gameStats.shots++;
        totals.shots++;
        break;
      case "ASSIST":
        gameStats.assists++;
        totals.assists++;
        break;
      case "STEAL":
        gameStats.steals++;
        totals.steals++;
        break;
      case "BLOCK":
        gameStats.blocks++;
        totals.blocks++;
        break;
      case "EXCLUSION":
        gameStats.exclusions++;
        totals.exclusions++;
        break;
    }
  }

  return {
    ...player,
    totals,
    games: Array.from(gamesMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  };
};

export const updatePlayer = async (
  id: number,
  teamId: number,
  data: {
    firstName?: string;
    lastName?: string;
    capNumber?: number;
    position?: string;
  }
) => {
  const player = await prisma.player.findFirst({
    where: { id, teamId },
  });

  if (!player) throw new Error("Player not found or unauthorized");

  return await prisma.player.update({
    where: { id },
    data: {
      ...data,
      ...(data.firstName && data.lastName
        ? {
            firstName: data.firstName.toUpperCase(),
            lastName: data.lastName.toUpperCase(),
            name: `${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()}`,
          }
        : {}),
      ...(data.position ? { position: data.position.toUpperCase() } : {}),
    },
  });
};

export const deletePlayer = async (id: number, teamId: number) => {
  const player = await prisma.player.findFirst({
    where: { id, teamId },
  });

  if (!player) throw new Error("Player not found or unauthorized");

  return await prisma.player.delete({ where: { id } });
};
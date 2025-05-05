import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create a player for a team (with relational connect)
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

// Get all players for a team
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

  const gamesMap = new Map<number, any>();

for (const stat of player.stats) {
  if (!stat.game) continue; // Skip if the stat is not linked to a valid game

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

  const gameStats = gamesMap.get(gameId);

  switch (stat.type) {
    case "goal":
      gameStats.goals++;
      gameStats.shots++; // goal counts as shot
      totals.goals++;
      totals.shots++;
      break;
    case "shot":
      gameStats.shots++;
      totals.shots++;
      break;
    case "assist":
      gameStats.assists++;
      totals.assists++;
      break;
    case "steal":
      gameStats.steals++;
      totals.steals++;
      break;
    case "block":
      gameStats.blocks++;
      totals.blocks++;
      break;
    case "exclusion":
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

// Update a player (only if they belong to the team)
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

// Delete a player (team-safe)
export const deletePlayer = async (id: number, teamId: number) => {
  const player = await prisma.player.findFirst({
    where: { id, teamId },
  });

  if (!player) throw new Error("Player not found or unauthorized");

  return await prisma.player.delete({ where: { id } });
};
import { PrismaClient, EventType, GameSituation, ShotOutcome } from "@prisma/client";
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

export const createStatEvent = async (teamId: number, data: StatInput) => {
  const [player, game] = await Promise.all([
    prisma.player.findFirst({ where: { id: data.playerId, teamId } }),
    prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
  ]);
  if (!player || !game) throw new Error("Unauthorized or invalid game/player");

  const eventType = data.type.toUpperCase() as EventType;
  const context = data.context?.toUpperCase() as GameSituation | undefined;

  return await prisma.$transaction(async (tx) => {
    const ev = await tx.statEvent.create({
      data: {
        type: eventType,
        x: data.x,
        y: data.y,
        capNumber: data.capNumber,
        context: context,
        period: data.period,
        clock: data.clock,
        playerId: data.playerId,
        gameId: data.gameId,
      },
    });

    if (ev.type === "GOAL") {
      await tx.game.update({
        where: { id: game.id },
        data: { teamScore: { increment: 1 } },
      });
    }

    return ev;
  });
};

export const createShotWithLocationEvent = async (
  teamId: number,
  data: {
    gameId: number;
    playerId: number;
    x: number;
    y: number;
    goalX?: number;
    goalY?: number;
    shotOutcome: string;
    assisterId?: number;
    period: number;
    clock: number;
    context?: string;
  }
) => {
  const [player, game] = await Promise.all([
    prisma.player.findFirst({ where: { id: data.playerId, teamId } }),
    prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
  ]);
  if (!player || !game) throw new Error("Unauthorized or invalid game/player");

  if (data.assisterId) {
    const assister = await prisma.player.findFirst({
      where: { id: data.assisterId, teamId },
    });
    if (!assister) throw new Error("Invalid assist player");
  }

  const isGoal = data.shotOutcome === "GOAL";
  const eventType = isGoal ? "GOAL" : "SHOT";
  const context = data.context?.toUpperCase() as GameSituation | undefined;
  const shotOutcome = data.shotOutcome.toUpperCase() as ShotOutcome;

  return await prisma.$transaction(async (tx) => {
    const shotEvent = await tx.statEvent.create({
      data: {
        type: eventType,
        x: data.x,
        y: data.y,
        goalX: data.goalX,
        goalY: data.goalY,
        shotOutcome: shotOutcome,
        context,
        period: data.period,
        clock: data.clock,
        playerId: data.playerId,
        gameId: data.gameId,
      },
    });

    let assistEvent = null;
    if (isGoal && data.assisterId) {
      assistEvent = await tx.statEvent.create({
        data: {
          type: "ASSIST",
          context,
          period: data.period,
          clock: data.clock,
          playerId: data.assisterId,
          gameId: data.gameId,
          assistEventId: shotEvent.id,
        },
      });
    }

    if (isGoal) {
      await tx.game.update({
        where: { id: game.id },
        data: { teamScore: { increment: 1 } },
      });
    }

    return { shot: shotEvent, assist: assistEvent };
  });
};

export const createGoalWithAssistEvent = async (
  teamId: number,
  data: {
    gameId: number;
    scorerId: number;
    assisterId: number | null;
    period: number;
    clock: number;
    context?: string;
  }
) => {
  const [scorer, game] = await Promise.all([
    prisma.player.findFirst({ where: { id: data.scorerId, teamId } }),
    prisma.game.findFirst({ where: { id: data.gameId, teamId } }),
  ]);
  if (!scorer || !game) throw new Error("Unauthorized or invalid game/player");

  if (data.assisterId) {
    const assister = await prisma.player.findFirst({
      where: { id: data.assisterId, teamId },
    });
    if (!assister) throw new Error("Invalid assist player");
  }

  const context = data.context?.toUpperCase() as GameSituation | undefined;

  return await prisma.$transaction(async (tx) => {
    const goalEvent = await tx.statEvent.create({
      data: {
        type: "GOAL",
        context,
        period: data.period,
        clock: data.clock,
        playerId: data.scorerId,
        gameId: data.gameId,
      },
    });

    let assistEvent = null;
    if (data.assisterId) {
      assistEvent = await tx.statEvent.create({
        data: {
          type: "ASSIST",
          context,
          period: data.period,
          clock: data.clock,
          playerId: data.assisterId,
          gameId: data.gameId,
          assistEventId: goalEvent.id,
        },
      });
    }

    await tx.game.update({
      where: { id: game.id },
      data: { teamScore: { increment: 1 } },
    });

    return { goal: goalEvent, assist: assistEvent };
  });
};

export const updateStatEvent = async (
  id: number,
  teamId: number,
  data: {
    playerId?: number;
    type?: string;
    x?: number;
    y?: number;
    context?: string;
    period?: number;
    clock?: number;
  }
) => {
  const stat = await prisma.statEvent.findFirst({
    where: { id },
    include: { game: true },
  });

  if (!stat || stat.game.teamId !== teamId) {
    throw new Error("Stat not found or unauthorized");
  }

  const oldType = stat.type;
  const newType = data.type?.toUpperCase() as EventType | undefined;

  return await prisma.$transaction(async (tx) => {
    if (oldType === "GOAL" && newType && newType !== "GOAL") {
      await tx.game.update({
        where: { id: stat.gameId },
        data: { teamScore: { decrement: 1 } },
      });
    }

    if (oldType !== "GOAL" && newType === "GOAL") {
      await tx.game.update({
        where: { id: stat.gameId },
        data: { teamScore: { increment: 1 } },
      });
    }

    const updated = await tx.statEvent.update({
      where: { id },
      data: {
        playerId: data.playerId,
        type: newType || stat.type,
        x: data.x,
        y: data.y,
        context: data.context?.toUpperCase() as GameSituation | undefined,
        period: data.period,
        clock: data.clock,
      },
    });

    return updated;
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
      player: { select: { id: true, name: true, capNumber: true } },
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

  return await prisma.$transaction(async (tx) => {
    await tx.statEvent.deleteMany({
      where: { assistEventId: id },
    });

    if (stat.type === "GOAL") {
      await tx.game.update({
        where: { id: stat.gameId },
        data: { teamScore: { decrement: 1 } },
      });
    }

    return await tx.statEvent.delete({ where: { id } });
  });
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
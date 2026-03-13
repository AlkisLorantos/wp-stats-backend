import { prisma } from "../lib/prisma";

export const exportPlayers = async (teamId: number) => {
  const players = await prisma.player.findMany({
    where: { teamId },
    orderBy: { capNumber: "asc" },
  });

  const headers = ["id", "name", "firstName", "lastName", "capNumber", "position"];
  const rows = players.map((p) => [
    p.id,
    p.name,
    p.firstName,
    p.lastName,
    p.capNumber || "",
    p.position || "",
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};

export const exportGames = async (teamId: number) => {
  const games = await prisma.game.findMany({
    where: { teamId },
    include: { competition: true },
    orderBy: { date: "desc" },
  });

  const headers = ["id", "date", "opponent", "location", "homeOrAway", "status", "teamScore", "opponentScore", "competition"];
  const rows = games.map((g) => [
    g.id,
    g.date.toISOString(),
    g.opponent,
    g.location || "",
    g.homeOrAway || "",
    g.status,
    g.teamScore,
    g.opponentScore,
    g.competition?.name || "",
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};

export const exportStats = async (teamId: number) => {
  const stats = await prisma.statEvent.findMany({
    where: { game: { teamId } },
    include: {
      player: true,
      game: true,
    },
    orderBy: { timestamp: "desc" },
  });

  const headers = ["id", "type", "playerId", "playerName", "gameId", "opponent", "period", "clock", "x", "y", "context", "timestamp"];
  const rows = stats.map((s) => [
    s.id,
    s.type,
    s.playerId,
    s.player.name,
    s.gameId,
    s.game.opponent,
    s.period || "",
    s.clock || "",
    s.x || "",
    s.y || "",
    s.context || "",
    s.timestamp.toISOString(),
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};
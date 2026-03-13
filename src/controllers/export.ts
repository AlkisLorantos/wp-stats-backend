import { Response } from "express";
import { exportPlayers, exportGames, exportStats } from "../services/export";
import { AuthRequest } from "../middleware/client/auth";

export const exportPlayersController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const csv = await exportPlayers(req.user!.teamId);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=players.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Failed to export players" });
  }
};

export const exportGamesController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const csv = await exportGames(req.user!.teamId);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=games.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Failed to export games" });
  }
};

export const exportStatsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const csv = await exportStats(req.user!.teamId);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=stats.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Failed to export stats" });
  }
};
import { Response } from "express";
import {
  createStatEvent,
  getStatsForGame,
  deleteStatEvent,
  updateStatEvent,
  createGoalWithAssistEvent,
  createShotWithLocationEvent,
  getPlayerStats,
  getTeamStats,
} from "../services/stat";
import { AuthRequest } from "../middleware/client/auth";

export const createStatController = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user!.teamId;
  const { playerId, type, x, y, capNumber, context, period, clock } = req.body;

  if (!gameId || !playerId || !type) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const stat = await createStatEvent(teamId, {
      gameId,
      playerId,
      type,
      x,
      y,
      capNumber,
      context,
      period,
      clock,
    });

    res.status(201).json({ message: "Stat recorded", stat });
  } catch (err: any) {
    console.error("Error creating stat:", err);
    res.status(500).json({ message: "Failed to create stat" });
  }
};

export const createShotWithLocationController = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user!.teamId;
  const { playerId, x, y, goalX, goalY, shotOutcome, assisterId, period, clock, context } = req.body;

  if (!gameId || !playerId || x === undefined || y === undefined) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const result = await createShotWithLocationEvent(teamId, {
      gameId,
      playerId,
      x,
      y,
      goalX,
      goalY,
      shotOutcome,
      assisterId,
      period,
      clock,
      context,
    });

    res.status(201).json({ message: "Shot recorded", ...result });
  } catch (err: any) {
    console.error("Error creating shot:", err);
    res.status(500).json({ message: "Failed to record shot" });
  }
};

export const createGoalWithAssistController = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user!.teamId;
  const { scorerId, assisterId, period, clock, context } = req.body;

  if (!gameId || !scorerId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const result = await createGoalWithAssistEvent(teamId, {
      gameId,
      scorerId,
      assisterId,
      period,
      clock,
      context,
    });

    res.status(201).json({ message: "Goal recorded", ...result });
  } catch (err: any) {
    console.error("Error creating goal with assist:", err);
    res.status(500).json({ message: "Failed to record goal" });
  }
};

export const updateStatController = async (req: AuthRequest, res: Response): Promise<void> => {
  const statId = Number(req.params.id);
  const teamId = req.user!.teamId;
  const { playerId, type, x, y, context, period, clock } = req.body;

  try {
    const stat = await updateStatEvent(statId, teamId, {
      playerId,
      type,
      x,
      y,
      context,
      period,
      clock,
    });

    res.json({ message: "Stat updated", stat });
  } catch (err: any) {
    console.error("Error updating stat:", err);
    res.status(500).json({ message: "Failed to update stat" });
  }
};

export const getGameStatsController = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user!.teamId;

  try {
    const stats = await getStatsForGame(gameId, teamId);
    res.json(stats);
  } catch (err: any) {
    console.error("Error fetching game stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const deleteStatController = async (req: AuthRequest, res: Response): Promise<void> => {
  const statId = Number(req.params.id);
  const teamId = req.user!.teamId;

  try {
    await deleteStatEvent(statId, teamId);
    res.json({ message: "Stat deleted" });
  } catch (err: any) {
    console.error("Error deleting stat:", err);
    res.status(500).json({ message: "Failed to delete stat" });
  }
};

export const getPlayerStatsController = async (req: AuthRequest, res: Response): Promise<void> => {
  const playerId = Number(req.params.id);
  const teamId = req.user!.teamId;

  try {
    const stats = await getPlayerStats(playerId, teamId);
    res.json(stats);
  } catch (err: any) {
    console.error("Error fetching player stats:", err);
    res.status(403).json({ message: "Player not found or unauthorized" });
  }
};

export const getTeamStatsController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user!.teamId;

  try {
    const stats = await getTeamStats(teamId);
    res.json(stats);
  } catch (err: any) {
    console.error("Error fetching team stats:", err);
    res.status(500).json({ message: "Failed to fetch team stats" });
  }
};
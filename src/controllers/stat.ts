import { Response } from "express";
import {
  createStatEvent,
  getStatsForGame,
  deleteStatEvent,
  updateStatEvent,
  createGoalWithAssistEvent,
  createShotWithLocationEvent
} from "../services/stat";
import { AuthRequest } from "../middleware/client/auth";
import { getPlayerStats } from "../services/stat";
import { getTeamStats } from "../services/stat";

export const createStat = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const {
    playerId,
    type,
    x,
    y,
    capNumber,
    context,
    period,
    clock,
  } = req.body;

  if (!gameId || !playerId || !type) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const stat = await createStatEvent(req.user.teamId, {
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
    res.status(500).json({ message: "Failed to create stat", error: err.message });
  }
};

export const createShotWithLocation = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user.teamId;
  const { 
    playerId, 
    x, 
    y, 
    goalX, 
    goalY, 
    shotOutcome, 
    assisterId, 
    period, 
    clock, 
    context 
  } = req.body;

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
    res.status(500).json({ message: "Failed to record shot", error: err.message });
  }
};

export const createGoalWithAssist = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user.teamId;
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
    res.status(500).json({ message: "Failed to record goal", error: err.message });
  }
};

export const updateStat = async (req: AuthRequest, res: Response): Promise<void> => {
  const statId = Number(req.params.id);
  const teamId = req.user.teamId;
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
    res.status(500).json({ message: "Failed to update stat", error: err.message });
  }
};

export const getGameStats = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = req.params.gameId;

  try {
    const stats = await getStatsForGame(Number(gameId), req.user.teamId);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

export const deleteStat = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteStatEvent(Number(id), req.user.teamId);
    res.json({ message: "Stat deleted" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete stat", error: err.message });
  }
};

export const getPlayerStatsController = async (req: AuthRequest, res: Response): Promise<void> => {
  const playerId = Number(req.params.playerId);

  try {
    const stats = await getPlayerStats(playerId);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch player stats", error: err.message });
  }
};

export const getTeamStatsController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = Number(req.params.teamId);

  try {
    const stats = await getTeamStats(teamId);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch team stats", error: err.message });
  }
};

export const getGlobalStatsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const stats = await getTeamStats(req.user.teamId);
    res.json(stats);
  } catch (err: any) {
    console.error("Error fetching global stats:", err);
    res.status(500).json({ message: "Failed to fetch global stats", error: err.message });
  }
};
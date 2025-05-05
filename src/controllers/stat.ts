import { Response } from "express";
import {
  createStatEvent,
  getStatsForGame,
  deleteStatEvent,
} from "../services/stat";
import { AuthRequest } from "../middleware/client/auth";

// POST /stats
export const createStat = async (req: AuthRequest, res: Response): Promise<void> => {
    const { gameId, playerId, type, x, y, capNumber, context, period, clock } = req.body;
  
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
    } catch (err) {
      console.error("Error creating stat:", err);
      res.status(500).json({ message: "Failed to create stat", error: err.message });
    }
  };

// GET /stats/game/:gameId
export const getGameStats = async (req: AuthRequest, res: Response): Promise<void> => {
  const { gameId } = req.params;

  try {
    const stats = await getStatsForGame(Number(gameId), req.user.teamId);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

// DELETE /stats/:id
export const deleteStat = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteStatEvent(Number(id), req.user.teamId);
    res.json({ message: "Stat deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete stat", error: err.message });
  }
};
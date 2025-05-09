import { Request, Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
import {
  recordSubstitution,
  getSubstitutionsForGame,
  calculatePlayingTime
} from "../services/substitution";

export const createSubstitution = async (req: AuthRequest, res: Response): Promise<void> => {
    const teamId = req.user?.teamId;
    const { gameId, period, time, playerInId, playerOutId } = req.body;
  
    if (!gameId || !period || !time || !playerInId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
  
    try {
      const sub = await recordSubstitution(teamId, {
        gameId,
        period,
        time,
        playerInId,
        playerOutId,
      });
  
      res.status(201).json(sub); 
    } catch (err: any) {
      console.error("Error creating substitution:", err);
      res.status(500).json({ message: "Failed to record substitution", error: err.message });
    }
  };

export const getGameSubstitutions = async (req: AuthRequest, res: Response) => {
  const { gameId } = req.params;
  const teamId = req.user?.teamId;

  try {
    const subs = await getSubstitutionsForGame(Number(gameId), teamId);
    res.json(subs);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch substitutions", error: err.message });
  }
};

export const getPlayerPlayingTime = async (req: AuthRequest, res: Response) => {  
  const { gameId, playerId } = req.params;
  
  if (!gameId || !playerId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const playingTime = await calculatePlayingTime(Number(gameId), Number(playerId));
    res.json({ playerId: Number(playerId), gameId: Number(gameId), playingTime });
  } catch (err: any) {
    console.error("Error calculating playing time:", err);
    res.status(500).json({ message: "Failed to calculate playing time", error: err.message });
  }
};
//
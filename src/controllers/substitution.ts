import { Request, Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
import {
  recordSubstitution,
  getSubstitutionsForGame,
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
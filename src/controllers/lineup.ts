import { Request, RequestHandler, Response } from "express";
import { getStartingLineup, saveStartingLineup } from "../services/lineup";

export const saveStartingLineupController: RequestHandler = async (req: Request, res: Response) => {
  const { gameId, period, assignments } = req.body;

  if (!gameId || !period || !assignments) {
 res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await saveStartingLineup({
      gameId: Number(gameId),
      period: Number(period),
      assignments,
    });

    res.json({ message: "Starting lineup saved" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to save starting lineup", error: err.message });
  }
};

export const getStartingLineupController: RequestHandler = async (req, res, next) => {
    try {
      const gameId = Number(req.params.gameId);
      const period = Number(req.query.period); 
  
      if (isNaN(period)) {
        res.status(400).json({ message: "Missing or invalid period" });
        return;
      }
  
      const lineup = await getStartingLineup(gameId, period);
      res.json(lineup);
    } catch (err) {
      next(err);
    }
  };
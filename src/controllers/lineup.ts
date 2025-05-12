import { Request, RequestHandler, Response } from "express";
import { getStartingLineup, saveStartingLineup } from "../services/lineup";

export const saveStartingLineupController: RequestHandler = async (req: Request, res: Response) => {
  const { period, lineup } = req.body;
  const gameId = Number(req.params.gameId)

  if (!period || !lineup) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    await saveStartingLineup({
      gameId,
      period: Number(period),
      lineup,
    });

    res.json({ message: "Starting lineup saved" });
  } catch (err: any) {
    console.error(" saveStartingLineup service error:", err);

    if (!res.headersSent) {
      res.status(500).json({ message: err.message || "Failed to save starting lineup" });
    }
  }
};

export const getStartingLineupController: RequestHandler = async (req, res, next) => {
    try {
      const gameId = Number(req.params.gameId);
      const period = Number(req.params.period); 
  
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
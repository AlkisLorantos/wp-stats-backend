import { Response, NextFunction } from "express";
import { getStartingLineup, saveStartingLineup } from "../services/lineup";
import { AuthRequest } from "../middleware/client/auth";

export const saveStartingLineupController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const { period, lineup } = req.body;

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
    res.status(500).json({ message: err.message || "Failed to save starting lineup" });
  }
};

export const getStartingLineupController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
import {
  recordSubstitution,
  getSubstitutionsForGame,
  calculatePlayingTime,
} from "../services/substitution";

export const createSubstitution = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const teamId = req.user?.teamId;
  const gameId = Number(req.params.gameId);
  const { period, time, playerInId, playerOutId } = req.body;

  if (!teamId) {
    res.status(401).json({ message: "Unauthorized: missing team ID" });
    return;
  }

  if (
    isNaN(gameId) ||
    typeof period !== "number" ||
    typeof time !== "number" ||
    typeof playerInId !== "number" ||
    typeof playerOutId !== "number"
  ) {
    res.status(400).json({ message: "Missing or invalid required fields" });
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
    res
      .status(500)
      .json({ message: "Failed to record substitution", error: err.message });
  }
};

export const getGameSubstitutions = async (req: AuthRequest, res: Response) => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user?.teamId;

  const parsedGameId = Number(gameId);
  if (!teamId || isNaN(parsedGameId)) {
    res.status(400).json({ message: "Missing or invalid gameId or teamId" });
    return;
  }

  try {
    const subs = await getSubstitutionsForGame(Number(gameId), teamId);
    res.json(subs);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Failed to fetch substitutions", error: err.message });
  }
};

export const getPlayerPlayingTime = async (req: AuthRequest, res: Response) => {
  const gameId = Number(req.params.gameId);
  const playerId = Number(req.params.playerId);
  const teamId = req.user?.teamId;

  const parsedGameId = Number(gameId);
  const parsedPlayerId = Number(playerId);

  if (!teamId || isNaN(parsedGameId) || isNaN(parsedPlayerId)) {
    res.status(400).json({ message: "Missing or invalid params" });
    return;
  }

  if (!gameId || !playerId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const playingTime = await calculatePlayingTime(
      Number(gameId),
      Number(playerId)
    );
    res.json({
      playerId: Number(playerId),
      gameId: Number(gameId),
      playingTime,
    });
  } catch (err: any) {
    console.error("Error calculating playing time:", err);
    res.status(500).json({
      message: "Failed to calculate playing time",
      error: err.message,
    });
  }
};

import { Response } from "express";
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
  const teamId = req.user!.teamId;
  const gameId = Number(req.params.gameId);
  const { period, time, playerInId, playerOutId } = req.body;

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
    res.status(500).json({ message: "Failed to record substitution" });
  }
};

export const getGameSubstitutions = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const teamId = req.user!.teamId;
  const gameId = Number(req.params.gameId);

  if (isNaN(gameId)) {
    res.status(400).json({ message: "Invalid game ID" });
    return;
  }

  try {
    const subs = await getSubstitutionsForGame(gameId, teamId);
    res.json(subs);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch substitutions" });
  }
};

export const getPlayerPlayingTime = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const teamId = req.user!.teamId;
  const gameId = Number(req.params.gameId);
  const playerId = Number(req.params.playerId);

  if (isNaN(gameId) || isNaN(playerId)) {
    res.status(400).json({ message: "Invalid game or player ID" });
    return;
  }

  try {
    const playingTime = await calculatePlayingTime(gameId, playerId);
    res.json({
      playerId,
      gameId,
      playingTime,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to calculate playing time" });
  }
};
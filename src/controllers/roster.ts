import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
import { assignRosterToGame, getRosterForGame } from "../services/gameRoster";

// POST /games/:gameId/roster
export const assignRoster = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user.teamId;
  const roster = req.body.roster; // [{ playerId: number, capNumber?: number }]

  if (!Array.isArray(roster) || roster.length === 0) {
    res.status(400).json({ message: "Roster must be a non-empty array" });
    return;
  }

  try {
    const result = await assignRosterToGame(teamId, gameId, roster);
    res.status(201).json({ message: "Roster assigned", result });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign roster", error: err.message });
  }
};

// GET /games/:gameId/roster
export const getRoster = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user.teamId;

  try {
    const roster = await getRosterForGame(gameId, teamId);
    res.json(roster);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch roster", error: err.message });
  }
};
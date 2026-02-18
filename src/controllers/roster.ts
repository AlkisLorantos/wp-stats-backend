import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
import { 
  assignRosterToGame, 
  addPlayerToRoster, 
  removePlayerFromRoster,
  getRosterForGame 
} from "../services/gameRoster";

export const assignRoster = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user.teamId;


  if (req.body.playerId && req.body.capNumber) {

    const { playerId, capNumber } = req.body;
    
    try {
      const result = await addPlayerToRoster(teamId, gameId, playerId, capNumber);
      res.status(201).json({ message: "Player added to roster", result });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
    return;
  }


  const roster = req.body.roster;

  if (!Array.isArray(roster) || roster.length === 0) {
    res.status(400).json({ message: "Roster must be a non-empty array" });
    return;
  }

  try {
    const result = await assignRosterToGame(teamId, gameId, roster);
    res.status(201).json({ message: "Roster assigned", result });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to assign roster", error: err.message });
  }
};

export const removeFromRoster = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const rosterId = Number(req.params.rosterId);
  const teamId = req.user.teamId;

  try {
    await removePlayerFromRoster(teamId, gameId, rosterId);
    res.json({ message: "Player removed from roster" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to remove player", error: err.message });
  }
};

export const getRoster = async (req: AuthRequest, res: Response): Promise<void> => {
  const gameId = Number(req.params.gameId);
  const teamId = req.user.teamId;

  try {
    const roster = await getRosterForGame(gameId, teamId);
    res.json(roster);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch roster", error: err.message });
  }
};
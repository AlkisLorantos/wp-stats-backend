import { Response } from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../services/player";
import { AuthRequest } from "../middleware/client/auth";

// GET /players 
export const getAllPlayers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const teamId = req.user?.teamId;
    const players = await getPlayers(teamId);
    res.json(players);
  } catch (err) {
    console.error("Error fetching players:", err);
    res.status(500).json({ message: "Failed to fetch players" });
  }
};

// GET /players/:id 
export const getPlayer = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const teamId = req.user?.teamId;

  try {
    const player = await getPlayerById(Number(id), teamId);
    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    res.status(200).json({
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      position: player.position,
      birthday: player.birthday,
      totals: player.totals,
      games: player.games, 
    });
  } catch (err: any) {
    console.error("Error fetching player:", err);
    res.status(500).json({ message: "Failed to fetch player", error: err.message });
  }
};

// POST /players - Create a player
export const createPlayerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;
  const { firstName, lastName, capNumber, position } = req.body;

  if (!firstName || !lastName) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const player = await createPlayer(teamId, {
      firstName,
      lastName,
      capNumber: capNumber ?? undefined,
      position: position || undefined,
    });

    res.status(201).json({ message: "Player created", player });
  } catch (err: any) {
    console.error("Error creating player:", err);
    res.status(500).json({ message: "Failed to create player", error: err.message });
  }
};

// PUT /players/:id - Update a player
export const updatePlayerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;
  const { id } = req.params;
  const { firstName, lastName, capNumber, position } = req.body;

  try {
    const updated = await updatePlayer(Number(id), teamId, {
      firstName,
      lastName,
      capNumber,
      position,
    });

    res.json({ message: "Player updated", player: updated });
  } catch (err) {
    console.error(" Error updating player:", err);
    res.status(500).json({ message: "Failed to update player", error: err.message });
  }
};

// DELETE /players/:id 
export const deletePlayerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;
  const { id } = req.params;

  try {
    await deletePlayer(Number(id), teamId);
    res.json({ message: "Player deleted" });
  } catch (err) {
    console.error(" Error deleting player:", err);
    res.status(500).json({ message: "Failed to delete player", error: err.message });
  }
};
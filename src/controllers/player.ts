import { Response } from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../services/player";
import { AuthRequest } from "../middleware/client/auth";

export const getAllPlayers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const teamId = req.user!.teamId;
    const players = await getPlayers(teamId);
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch players" });
  }
};

export const getPlayer = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const teamId = req.user!.teamId;

  try {
    const player = await getPlayerById(Number(id), teamId);
    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    res.json({
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      name: `${player.firstName} ${player.lastName}`,
      capNumber: player.capNumber,
      position: player.position,
      birthday: player.birthday,
      totals: player.totals,
      games: player.games,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch player" });
  }
};

export const createPlayerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user!.teamId;
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
    res.status(400).json({ message: err.message || "Failed to create player" });
  }
};

export const updatePlayerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user!.teamId;
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
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Failed to update player" });
  }
};

export const deletePlayerController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user!.teamId;
  const { id } = req.params;

  try {
    await deletePlayer(Number(id), teamId);
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete player" });
  }
};
import { Response } from "express";
import {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame,
} from "../services/game";
import { AuthRequest } from "../middleware/client/auth";

// GET /games - List all games for the logged-in team
export const getAllGames = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const games = await getGames(req.user.teamId);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games" });
  }
};

// GET /games/:id - Fetch a specific game
export const getGame = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const game = await getGameById(Number(id), req.user.teamId);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch game" });
  }
};

// POST /games - Create a new game for the current team
export const createGameController = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const { date, opponent, location, homeOrAway } = req.body;
    const teamId = req.user?.teamId;
  
    if (!teamId) {
      res.status(403).json({ message: "Missing team ID from user context" });
      return;
    }
  
    if (!date || !opponent || !homeOrAway) {
      res.status(400).json({ message: "Missing required fields: date, opponent or homeOrAway" });
      return;
    }
  
    if (homeOrAway !== "home" && homeOrAway !== "away") {
      res.status(400).json({ message: "homeOrAway must be either 'home' or 'away'" });
      return;
    }
  
    try {
      const newGame = await createGame({
        date: new Date(date),
        opponent,
        location,
        homeOrAway,
        teamId,
      });
  
      res.status(201).json({ message: "Game created", game: newGame });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to create game", error: err.message });
    }
  };
// PUT /games/:id - Update a specific game
export const updateGameController = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const {
      date,
      opponent,
      location,
      teamScore,
      opponentScore,
      homeOrAway, 
    } = req.body;
  
    try {
      const updated = await updateGame(Number(id), req.user.teamId, {
        date,
        opponent,
        location,
        teamScore,
        opponentScore,
        homeOrAway, 
      });
  
      res.json({ message: "Game updated", game: updated });
    } catch (err) {
      res.status(500).json({ message: "Failed to update game", error: err.message });
    }
  };

// DELETE /games/:id - Delete a game
export const deleteGameController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteGame(Number(id), req.user.teamId);
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete game", error: err.message });
  }
};
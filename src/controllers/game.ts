import { Response } from "express";
import {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame,
  endGame, 
  startGame
} from "../services/game";
import { AuthRequest } from "../middleware/client/auth";

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

export const getGame = async (req: AuthRequest, res: Response) => {
  try {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId

    if (Number.isNaN(gameId)) {
      res.status(400).json({ message: "Invalid game ID" });
      return;     
  }

  const game = await getGameById(gameId,teamId);
  if (!game) {
    res.status(404).json({ message: "Game not found" });
    return;
  }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch game", error: err.message });
  }
};


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

export const startGameController = async (req, res ) => {
  const { id } = req.params;

  try {
    const game = await startGame(Number(id),);
    res.json({ message: "Game started", game });
  } catch (err) {
    res.status(500).json({ message: "Failed to start game", error: err.message });
  }
}

export const endGameController = async (req, res ) => {
  const { id } = req.params;

  try {
    const game = await endGame(Number(id),);
    res.json({ message: "Game ended", game });
  } catch (err) {
    res.status(500).json({ message: "Failed to end game", error: err.message });
  }
}
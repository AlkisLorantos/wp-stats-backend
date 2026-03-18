"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endGameController = exports.startGameController = exports.deleteGameController = exports.updateGameController = exports.createGameController = exports.getGame = exports.getAllGames = void 0;
const game_1 = require("../services/game");
const getAllGames = async (req, res) => {
    try {
        const games = await (0, game_1.getGames)(req.user.teamId);
        res.json(games);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch games", error: err.message });
    }
};
exports.getAllGames = getAllGames;
const getGame = async (req, res) => {
    try {
        const gameId = Number(req.params.gameId);
        const teamId = req.user.teamId;
        if (Number.isNaN(gameId)) {
            res.status(400).json({ message: "Invalid game ID" });
            return;
        }
        const game = await (0, game_1.getGameById)(gameId, teamId);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        res.json(game);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch game", error: err.message });
    }
};
exports.getGame = getGame;
const createGameController = async (req, res) => {
    const { date, opponent, location, homeOrAway, competitionId } = req.body;
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
        const newGame = await (0, game_1.createGame)({
            date: new Date(date),
            opponent,
            location,
            homeOrAway,
            teamId,
            competitionId: competitionId ? Number(competitionId) : undefined,
        });
        res.status(201).json({ message: "Game created", game: newGame });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create game" });
    }
};
exports.createGameController = createGameController;
const updateGameController = async (req, res) => {
    const { gameId } = req.params;
    const { date, opponent, location, teamScore, opponentScore, homeOrAway, } = req.body;
    try {
        const updated = await (0, game_1.updateGame)(Number(gameId), req.user.teamId, {
            date,
            opponent,
            location,
            teamScore,
            opponentScore,
            homeOrAway,
        });
        res.json({ message: "Game updated", game: updated });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update game", error: err.message });
    }
};
exports.updateGameController = updateGameController;
const deleteGameController = async (req, res) => {
    const { gameId } = req.params;
    try {
        await (0, game_1.deleteGame)(Number(gameId), req.user.teamId);
        res.json({ message: "Game deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete game", error: err.message });
    }
};
exports.deleteGameController = deleteGameController;
const startGameController = async (req, res) => {
    const { gameId } = req.params;
    const teamId = req.user.teamId;
    try {
        const game = await (0, game_1.startGame)(Number(gameId), teamId);
        res.json({ message: "Game started", game });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to start game", error: err.message });
    }
};
exports.startGameController = startGameController;
const endGameController = async (req, res) => {
    const { gameId } = req.params;
    const teamId = req.user.teamId;
    try {
        const game = await (0, game_1.endGame)(Number(gameId), teamId);
        res.json({ message: "Game ended", game });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to end game", error: err.message });
    }
};
exports.endGameController = endGameController;
//# sourceMappingURL=game.js.map
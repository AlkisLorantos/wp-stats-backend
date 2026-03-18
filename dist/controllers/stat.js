"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamStatsController = exports.getPlayerStatsController = exports.deleteStatController = exports.getGameStatsController = exports.updateStatController = exports.createGoalWithAssistController = exports.createShotWithLocationController = exports.createStatController = void 0;
const stat_1 = require("../services/stat");
const createStatController = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId;
    const { playerId, type, x, y, capNumber, context, period, clock } = req.body;
    if (!gameId || !playerId || !type) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const stat = await (0, stat_1.createStatEvent)(teamId, {
            gameId,
            playerId,
            type,
            x,
            y,
            capNumber,
            context,
            period,
            clock,
        });
        res.status(201).json({ message: "Stat recorded", stat });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create stat" });
    }
};
exports.createStatController = createStatController;
const createShotWithLocationController = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId;
    const { playerId, x, y, goalX, goalY, shotOutcome, assisterId, period, clock, context } = req.body;
    if (!gameId || !playerId || x === undefined || y === undefined) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const result = await (0, stat_1.createShotWithLocationEvent)(teamId, {
            gameId,
            playerId,
            x,
            y,
            goalX,
            goalY,
            shotOutcome,
            assisterId,
            period,
            clock,
            context,
        });
        res.status(201).json({ message: "Shot recorded", ...result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to record shot" });
    }
};
exports.createShotWithLocationController = createShotWithLocationController;
const createGoalWithAssistController = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId;
    const { scorerId, assisterId, period, clock, context } = req.body;
    if (!gameId || !scorerId) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const result = await (0, stat_1.createGoalWithAssistEvent)(teamId, {
            gameId,
            scorerId,
            assisterId,
            period,
            clock,
            context,
        });
        res.status(201).json({ message: "Goal recorded", ...result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to record goal" });
    }
};
exports.createGoalWithAssistController = createGoalWithAssistController;
const updateStatController = async (req, res) => {
    const statId = Number(req.params.id);
    const teamId = req.user.teamId;
    const { playerId, type, x, y, context, period, clock } = req.body;
    try {
        const stat = await (0, stat_1.updateStatEvent)(statId, teamId, {
            playerId,
            type,
            x,
            y,
            context,
            period,
            clock,
        });
        res.json({ message: "Stat updated", stat });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update stat" });
    }
};
exports.updateStatController = updateStatController;
const getGameStatsController = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId;
    try {
        const stats = await (0, stat_1.getStatsForGame)(gameId, teamId);
        res.json(stats);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
exports.getGameStatsController = getGameStatsController;
const deleteStatController = async (req, res) => {
    const statId = Number(req.params.id);
    const teamId = req.user.teamId;
    try {
        await (0, stat_1.deleteStatEvent)(statId, teamId);
        res.json({ message: "Stat deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete stat" });
    }
};
exports.deleteStatController = deleteStatController;
const getPlayerStatsController = async (req, res) => {
    const playerId = Number(req.params.id);
    const teamId = req.user.teamId;
    try {
        const stats = await (0, stat_1.getPlayerStats)(playerId, teamId);
        res.json(stats);
    }
    catch (err) {
        res.status(403).json({ message: "Player not found or unauthorized" });
    }
};
exports.getPlayerStatsController = getPlayerStatsController;
const getTeamStatsController = async (req, res) => {
    const teamId = req.user.teamId;
    try {
        const stats = await (0, stat_1.getTeamStats)(teamId);
        res.json(stats);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch team stats" });
    }
};
exports.getTeamStatsController = getTeamStatsController;
//# sourceMappingURL=stat.js.map
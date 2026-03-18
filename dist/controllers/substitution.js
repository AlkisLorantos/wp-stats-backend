"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerPlayingTime = exports.getGameSubstitutions = exports.createSubstitution = void 0;
const substitution_1 = require("../services/substitution");
const createSubstitution = async (req, res) => {
    const teamId = req.user.teamId;
    const gameId = Number(req.params.gameId);
    const { period, time, playerInId, playerOutId } = req.body;
    if (isNaN(gameId) ||
        typeof period !== "number" ||
        typeof time !== "number" ||
        typeof playerInId !== "number" ||
        typeof playerOutId !== "number") {
        res.status(400).json({ message: "Missing or invalid required fields" });
        return;
    }
    try {
        const sub = await (0, substitution_1.recordSubstitution)(teamId, {
            gameId,
            period,
            time,
            playerInId,
            playerOutId,
        });
        res.status(201).json(sub);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to record substitution" });
    }
};
exports.createSubstitution = createSubstitution;
const getGameSubstitutions = async (req, res) => {
    const teamId = req.user.teamId;
    const gameId = Number(req.params.gameId);
    if (isNaN(gameId)) {
        res.status(400).json({ message: "Invalid game ID" });
        return;
    }
    try {
        const subs = await (0, substitution_1.getSubstitutionsForGame)(gameId, teamId);
        res.json(subs);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch substitutions" });
    }
};
exports.getGameSubstitutions = getGameSubstitutions;
const getPlayerPlayingTime = async (req, res) => {
    const teamId = req.user.teamId;
    const gameId = Number(req.params.gameId);
    const playerId = Number(req.params.playerId);
    if (isNaN(gameId) || isNaN(playerId)) {
        res.status(400).json({ message: "Invalid game or player ID" });
        return;
    }
    try {
        const playingTime = await (0, substitution_1.calculatePlayingTime)(gameId, playerId);
        res.json({
            playerId,
            gameId,
            playingTime,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to calculate playing time" });
    }
};
exports.getPlayerPlayingTime = getPlayerPlayingTime;
//# sourceMappingURL=substitution.js.map
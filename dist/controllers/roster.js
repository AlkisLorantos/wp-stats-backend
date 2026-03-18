"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoster = exports.removeFromRoster = exports.assignRoster = void 0;
const gameRoster_1 = require("../services/gameRoster");
const assignRoster = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId;
    if (req.body.playerId && req.body.capNumber) {
        const { playerId, capNumber } = req.body;
        try {
            const result = await (0, gameRoster_1.addPlayerToRoster)(teamId, gameId, playerId, capNumber);
            res.status(201).json({ message: "Player added to roster", result });
        }
        catch (err) {
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
        const result = await (0, gameRoster_1.assignRosterToGame)(teamId, gameId, roster);
        res.status(201).json({ message: "Roster assigned", result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to assign roster", error: err.message });
    }
};
exports.assignRoster = assignRoster;
const removeFromRoster = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const rosterId = Number(req.params.rosterId);
    const teamId = req.user.teamId;
    try {
        await (0, gameRoster_1.removePlayerFromRoster)(teamId, gameId, rosterId);
        res.json({ message: "Player removed from roster" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to remove player", error: err.message });
    }
};
exports.removeFromRoster = removeFromRoster;
const getRoster = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const teamId = req.user.teamId;
    try {
        const roster = await (0, gameRoster_1.getRosterForGame)(gameId, teamId);
        res.json(roster);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch roster", error: err.message });
    }
};
exports.getRoster = getRoster;
//# sourceMappingURL=roster.js.map
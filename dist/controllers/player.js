"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayerController = exports.updatePlayerController = exports.createPlayerController = exports.getPlayer = exports.getAllPlayers = void 0;
const player_1 = require("../services/player");
const getAllPlayers = async (req, res) => {
    try {
        const teamId = req.user.teamId;
        const players = await (0, player_1.getPlayers)(teamId);
        res.json(players);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch players" });
    }
};
exports.getAllPlayers = getAllPlayers;
const getPlayer = async (req, res) => {
    const { id } = req.params;
    const teamId = req.user.teamId;
    try {
        const player = await (0, player_1.getPlayerById)(Number(id), teamId);
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
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch player" });
    }
};
exports.getPlayer = getPlayer;
const createPlayerController = async (req, res) => {
    const teamId = req.user.teamId;
    const { firstName, lastName, capNumber, position } = req.body;
    if (!firstName || !lastName) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const player = await (0, player_1.createPlayer)(teamId, {
            firstName,
            lastName,
            capNumber: capNumber ?? undefined,
            position: position || undefined,
        });
        res.status(201).json({ message: "Player created", player });
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Failed to create player" });
    }
};
exports.createPlayerController = createPlayerController;
const updatePlayerController = async (req, res) => {
    const teamId = req.user.teamId;
    const { id } = req.params;
    const { firstName, lastName, capNumber, position } = req.body;
    try {
        const updated = await (0, player_1.updatePlayer)(Number(id), teamId, {
            firstName,
            lastName,
            capNumber,
            position,
        });
        res.json({ message: "Player updated", player: updated });
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Failed to update player" });
    }
};
exports.updatePlayerController = updatePlayerController;
const deletePlayerController = async (req, res) => {
    const teamId = req.user.teamId;
    const { id } = req.params;
    try {
        await (0, player_1.deletePlayer)(Number(id), teamId);
        res.json({ message: "Player deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete player" });
    }
};
exports.deletePlayerController = deletePlayerController;
//# sourceMappingURL=player.js.map
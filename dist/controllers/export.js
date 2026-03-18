"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportStatsController = exports.exportGamesController = exports.exportPlayersController = void 0;
const export_1 = require("../services/export");
const exportPlayersController = async (req, res) => {
    try {
        const csv = await (0, export_1.exportPlayers)(req.user.teamId);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=players.csv");
        res.send(csv);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to export players" });
    }
};
exports.exportPlayersController = exportPlayersController;
const exportGamesController = async (req, res) => {
    try {
        const csv = await (0, export_1.exportGames)(req.user.teamId);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=games.csv");
        res.send(csv);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to export games" });
    }
};
exports.exportGamesController = exportGamesController;
const exportStatsController = async (req, res) => {
    try {
        const csv = await (0, export_1.exportStats)(req.user.teamId);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=stats.csv");
        res.send(csv);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to export stats" });
    }
};
exports.exportStatsController = exportStatsController;
//# sourceMappingURL=export.js.map
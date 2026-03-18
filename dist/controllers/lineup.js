"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartingLineupController = exports.saveStartingLineupController = void 0;
const lineup_1 = require("../services/lineup");
const saveStartingLineupController = async (req, res) => {
    const gameId = Number(req.params.gameId);
    const { period, lineup } = req.body;
    if (!period || !lineup) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        await (0, lineup_1.saveStartingLineup)({
            gameId,
            period: Number(period),
            lineup,
        });
        res.json({ message: "Starting lineup saved" });
    }
    catch (err) {
        res.status(500).json({ message: err.message || "Failed to save starting lineup" });
    }
};
exports.saveStartingLineupController = saveStartingLineupController;
const getStartingLineupController = async (req, res, next) => {
    try {
        const gameId = Number(req.params.gameId);
        const period = Number(req.params.period);
        if (isNaN(period)) {
            res.status(400).json({ message: "Missing or invalid period" });
            return;
        }
        const lineup = await (0, lineup_1.getStartingLineup)(gameId, period);
        res.json(lineup);
    }
    catch (err) {
        next(err);
    }
};
exports.getStartingLineupController = getStartingLineupController;
//# sourceMappingURL=lineup.js.map
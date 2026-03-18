"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamStatsController = void 0;
const teamStats_1 = require("../services/teamStats");
const getTeamStatsController = async (req, res) => {
    const teamId = req.user.teamId;
    try {
        const stats = await (0, teamStats_1.getTeamStats)(teamId);
        res.json(stats);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch team stats" });
    }
};
exports.getTeamStatsController = getTeamStatsController;
//# sourceMappingURL=teamStats.js.map
"use strict";
// import { Request, Response } from "express";
// import { getPlayer } from "../../services/player";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
const player_1 = require("../../services/player");
const show = async (req, res) => {
    try {
        const name = req.params.name.toUpperCase(); // Convert input to uppercase
        const players = await (0, player_1.getPlayer)(name);
        if (!players || players.length === 0) {
            res.status(404).json({ message: "No players found" });
            return;
        }
        // If multiple players match, return an array
        res.status(200).json({ data: players });
    }
    catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.show = show;
//# sourceMappingURL=show.js.map
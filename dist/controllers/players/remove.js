"use strict";
// import { Request, Response } from "express";
// import { removePlayer } from "../../services/player";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const player_1 = require("../../services/player");
const remove = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid or missing player ID" });
        }
        const deletedPlayer = await (0, player_1.removePlayer)(Number(id));
        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        return res.status(200).json({
            message: "Player removed successfully",
            data: deletedPlayer,
        });
    }
    catch (error) {
        console.error("Error removing player:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.remove = remove;
//# sourceMappingURL=remove.js.map
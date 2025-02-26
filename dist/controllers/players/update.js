"use strict";
// import { Request, Response } from "express";
// import { updatePlayer } from './../../services/player';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const player_1 = require("../../services/player");
const update = async (req, res) => {
    try {
        let _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid or missing player ID" });
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }
        const updatedPlayer = await (0, player_1.updatePlayer)(Number(id), data);
        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        return res.status(200).json({
            message: "Player updated successfully",
            data: updatedPlayer,
        });
    }
    catch (error) {
        console.error("Error updating player:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.update = update;
//# sourceMappingURL=update.js.map
"use strict";
// import { create } from "./create";
// import { show } from "./show";
// import { showMany } from "./showMany";
// import { update } from './update';
// import { remove } from "./remove";
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
exports.remove = exports.update = exports.showMany = exports.show = exports.create = void 0;
const player_1 = require("../../services/player");
const create = async (req, res) => {
    try {
        const player = await (0, player_1.createPlayer)(req.body);
        res.status(201).json(player);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.create = create;
const show = async (req, res) => {
    try {
        const player = await (0, player_1.getPlayer)(req.params.name);
        if (!player) {
            res.status(404).json({ message: "Player not found" });
            return; // Explicit return to fix TypeScript error
        }
        res.status(200).json(player);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.show = show;
const showMany = async (req, res) => {
    try {
        const players = await (0, player_1.getPlayers)();
        res.status(200).json(players);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.showMany = showMany;
const update = async (req, res) => {
    try {
        const _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return; // Explicit return
        }
        const updatedPlayer = await (0, player_1.updatePlayer)(Number(id), data);
        res.status(200).json(updatedPlayer);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return; // Explicit return
        }
        await (0, player_1.removePlayer)(Number(id));
        res.status(200).json({ message: "Player deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.remove = remove;
//# sourceMappingURL=index.js.map
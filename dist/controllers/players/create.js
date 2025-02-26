"use strict";
// import { Request, Response } from "express";
// import { createPlayer } from "../../services/player";
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
exports.create = void 0;
const player_1 = require("../../services/player");
const create = async (req, res) => {
    try {
        let _a = req.body, { birthday } = _a, rest = __rest(_a, ["birthday"]);
        if (!birthday || typeof birthday !== "string") {
            return res.status(400).json({ message: "Invalid birthday format" });
        }
        const [day, month, year] = birthday.split("/");
        const birthdayDateObject = new Date(`${year}-${month}-${day}`);
        if (isNaN(birthdayDateObject.getTime())) {
            return res.status(400).json({ message: "Invalid date provided" });
        }
        const playerRecord = await (0, player_1.createPlayer)(Object.assign({ birthday: birthdayDateObject }, rest));
        return res.status(201).json({
            message: "created_player",
            data: playerRecord
        });
    }
    catch (error) {
        console.error("Error creating player:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.create = create;
//# sourceMappingURL=create.js.map
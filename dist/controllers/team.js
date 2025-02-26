"use strict";
// import { Request, Response } from "express";
// import { createTeam } from './../services/team';
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const team_1 = require("../services/team");
const create = async (req, res) => {
    try {
        const team = await (0, team_1.createTeam)(req.body);
        res.status(201).json({
            message: "Team created successfully",
            data: team
        });
    }
    catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.create = create;
//# sourceMappingURL=team.js.map
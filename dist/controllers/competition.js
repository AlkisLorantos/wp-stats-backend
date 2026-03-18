"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompetitionController = exports.updateCompetitionController = exports.createCompetitionController = exports.getCompetitionController = exports.getCompetitionsController = void 0;
const competition_1 = require("../services/competition");
const getCompetitionsController = async (req, res) => {
    try {
        const competitions = await (0, competition_1.getCompetitions)(req.user.teamId);
        res.json(competitions);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch competitions" });
    }
};
exports.getCompetitionsController = getCompetitionsController;
const getCompetitionController = async (req, res) => {
    const id = Number(req.params.id);
    const teamId = req.user.teamId;
    try {
        const competition = await (0, competition_1.getCompetitionById)(id, teamId);
        if (!competition) {
            res.status(404).json({ message: "Competition not found" });
            return;
        }
        res.json(competition);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch competition" });
    }
};
exports.getCompetitionController = getCompetitionController;
const createCompetitionController = async (req, res) => {
    const teamId = req.user.teamId;
    const { name, type, season } = req.body;
    if (!name) {
        res.status(400).json({ message: "Name is required" });
        return;
    }
    try {
        const competition = await (0, competition_1.createCompetition)(teamId, { name, type, season });
        res.status(201).json({ message: "Competition created", competition });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create competition" });
    }
};
exports.createCompetitionController = createCompetitionController;
const updateCompetitionController = async (req, res) => {
    const id = Number(req.params.id);
    const teamId = req.user.teamId;
    const { name, type, season } = req.body;
    try {
        const competition = await (0, competition_1.updateCompetition)(id, teamId, { name, type, season });
        res.json({ message: "Competition updated", competition });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update competition" });
    }
};
exports.updateCompetitionController = updateCompetitionController;
const deleteCompetitionController = async (req, res) => {
    const id = Number(req.params.id);
    const teamId = req.user.teamId;
    try {
        await (0, competition_1.deleteCompetition)(id, teamId);
        res.json({ message: "Competition deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete competition" });
    }
};
exports.deleteCompetitionController = deleteCompetitionController;
//# sourceMappingURL=competition.js.map
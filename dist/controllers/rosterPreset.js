"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePresetController = exports.getPresetController = exports.getPresetsController = exports.savePresetController = void 0;
const rosterPreset_1 = require("../services/rosterPreset");
const savePresetController = async (req, res) => {
    const teamId = req.user?.teamId;
    const { name, roster } = req.body;
    if (!name || !roster || !Array.isArray(roster)) {
        res.status(400).json({ message: "Invalid payload" });
        return;
    }
    try {
        const preset = await (0, rosterPreset_1.createRosterPreset)(teamId, name, roster);
        res.status(201).json(preset);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to save preset", error: err.message });
    }
};
exports.savePresetController = savePresetController;
const getPresetsController = async (req, res) => {
    const teamId = req.user?.teamId;
    try {
        const presets = await (0, rosterPreset_1.getRosterPresets)(teamId);
        res.json(presets);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch presets", error: err.message });
    }
};
exports.getPresetsController = getPresetsController;
const getPresetController = async (req, res) => {
    const teamId = req.user?.teamId;
    const { id } = req.params;
    try {
        const preset = await (0, rosterPreset_1.getPresetById)(Number(id), teamId);
        if (!preset) {
            res.status(404).json({ message: "Preset not found" });
            return;
        }
        res.json(preset);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch preset", error: err.message });
    }
};
exports.getPresetController = getPresetController;
const deletePresetController = async (req, res) => {
    const teamId = req.user?.teamId;
    const { id } = req.params;
    try {
        await (0, rosterPreset_1.deleteRosterPreset)(Number(id), teamId);
        res.json({ message: "Preset deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete preset", error: err.message });
    }
};
exports.deletePresetController = deletePresetController;
//# sourceMappingURL=rosterPreset.js.map
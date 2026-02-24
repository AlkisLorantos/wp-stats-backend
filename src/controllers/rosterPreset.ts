import { Request, Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
import {
  createRosterPreset,
  getRosterPresets,
  getPresetById,
  deleteRosterPreset,
} from "../services/rosterPreset";

export const savePresetController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;
  const { name, roster } = req.body;

  if (!name || !roster || !Array.isArray(roster)) {
    res.status(400).json({ message: "Invalid payload" });
    return;
  }

  try {
    const preset = await createRosterPreset(teamId, name, roster);
    res.status(201).json(preset);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to save preset", error: err.message });
  }
};

export const getPresetsController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;

  try {
    const presets = await getRosterPresets(teamId);
    res.json(presets);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch presets", error: err.message });
  }
};

export const getPresetController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;
  const { id } = req.params;

  try {
    const preset = await getPresetById(Number(id), teamId);
    if (!preset) {
      res.status(404).json({ message: "Preset not found" });
      return;
    }
    res.json(preset);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch preset", error: err.message });
  }
};

export const deletePresetController = async (req: AuthRequest, res: Response): Promise<void> => {
  const teamId = req.user?.teamId;
  const { id } = req.params;

  try {
    await deleteRosterPreset(Number(id), teamId);
    res.json({ message: "Preset deleted" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete preset", error: err.message });
  }
};
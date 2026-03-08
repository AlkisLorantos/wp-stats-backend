import { Response } from "express";
import {
  getCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} from "../services/competition";
import { AuthRequest } from "../middleware/client/auth";

export const getCompetitionsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const competitions = await getCompetitions(req.user!.teamId);
    res.json(competitions);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch competitions" });
  }
};

export const getCompetitionController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const teamId = req.user!.teamId;

  try {
    const competition = await getCompetitionById(id, teamId);
    if (!competition) {
      res.status(404).json({ message: "Competition not found" });
      return;
    }
    res.json(competition);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch competition" });
  }
};

export const createCompetitionController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const teamId = req.user!.teamId;
  const { name, type, season } = req.body;

  if (!name) {
    res.status(400).json({ message: "Name is required" });
    return;
  }

  try {
    const competition = await createCompetition(teamId, { name, type, season });
    res.status(201).json({ message: "Competition created", competition });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to create competition" });
  }
};

export const updateCompetitionController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const teamId = req.user!.teamId;
  const { name, type, season } = req.body;

  try {
    const competition = await updateCompetition(id, teamId, { name, type, season });
    res.json({ message: "Competition updated", competition });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to update competition" });
  }
};

export const deleteCompetitionController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const teamId = req.user!.teamId;

  try {
    await deleteCompetition(id, teamId);
    res.json({ message: "Competition deleted" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete competition" });
  }
};
import { Response } from "express";
import { getTeamStats } from "../services/teamStats";
import { AuthRequest } from "../middleware/client/auth";

export const getTeamStatsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const teamId = req.user!.teamId;

  try {
    const stats = await getTeamStats(teamId);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch team stats" });
  }
};
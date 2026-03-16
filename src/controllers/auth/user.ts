import { Request, Response, NextFunction } from "express";
import {
  createTeamAndCoach,
  authenticateUser,
  getUserInfo,
  updateTeamName,
  regenerateApiKey,
  deleteUser,
} from "../../services/auth/user";
import { AuthRequest } from "../../middleware/client/auth";

const COOKIE_NAME = "token";
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export const signupTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, teamName } = req.body;

  if (!username || !password || !teamName) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const result = await createTeamAndCoach(username, password, teamName);
    res.cookie(COOKIE_NAME, result.token, COOKIE_OPTS);
    res.status(201).json({
      message: "Team and user created successfully",
      user: result.user,
      team: result.team,
      apiKey: result.apiKey,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Signup failed" });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Missing username or password" });
    return;
  }

  try {
    const result = await authenticateUser(username, password);
    res.cookie(COOKIE_NAME, result.token, COOKIE_OPTS);
    res.status(200).json({
      message: "Login successful",
      user: result.user,
      team: result.team,
      apiKey: result.apiKey,
    });
  } catch (err: any) {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ message: "Logged out" });
};

export const getUserController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await getUserInfo(req.user!.userId, req.user!.teamId);
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};

export const updateTeamNameController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Team name is required" });
    return;
  }

  try {
    const team = await updateTeamName(req.user!.teamId, name);
    res.json({ message: "Team name updated", team });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Failed to update team name" });
  }
};

export const regenerateApiKeyController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const apiKey = await regenerateApiKey(req.user!.userId, req.user!.teamId);
    res.json({ message: "API key regenerated", apiKey });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to regenerate API key" });
  }
};

export const deleteUserController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { confirmText } = req.body;

  if (confirmText !== "DELETE") {
    res.status(400).json({ message: "Please type DELETE to confirm" });
    return;
  }

  try {
    await deleteUser(req.user!.userId, req.user!.teamId);
    res.clearCookie(COOKIE_NAME);
    res.json({ message: "Account deleted" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete account" });
  }
};
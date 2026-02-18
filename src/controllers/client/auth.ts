import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createTeamAndCoach, authenticateUser } from "../../services/client/user";

const JWT_SECRET = process.env.JWT_SECRET!;
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
  
    const userId = result.user.id;
    const teamId = result.team.id;
    const role   = result.user.role;

    
    const token = jwt.sign({ userId, teamId, role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie(COOKIE_NAME, token, COOKIE_OPTS);

    res.status(201).json({
      message: "Team and user created successfully",
      user:  result.user,
      team:  result.team,
      apiKey: result.apiKey,
    });
  } catch (err: any) {
    console.error("Signup Error:", err);
    res.status(400).json({ message: err.message });
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
    const userId = result.user.id;
    const teamId = result.team.id;
    const role   = result.user.role;

    const token = jwt.sign({ userId, teamId, role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie(COOKIE_NAME, token, COOKIE_OPTS);

    res.status(200).json({
      message: "Login successful",
      user:  result.user,
      team:  result.team,
      apiKey: result.apiKey,
    });
  } catch (err: any) {
    console.error("Login Error:", err);
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ message: "Logged out" });
};
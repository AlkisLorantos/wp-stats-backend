import { Request, Response, NextFunction } from "express";
import { createTeamAndCoach, authenticateUser } from "../../services/client/user";

// OST /auth/signupteam
export const signupTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, teamName } = req.body;

  if (!username || !password || !teamName) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const result = await createTeamAndCoach(username, password, teamName);
    res.status(201).json({
      message: "Team and user created successfully",
      ...result,
    });
  } catch (err: any) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// POST /auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Missing username or password" });
    return;
  }

  try {
    const result = await authenticateUser(username, password);
    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (err: any) {
    console.error("Login Error:", err);
    res.status(401).json({ message: err.message });
  }
};
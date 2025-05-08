import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
    teamId: number;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No valid token provided" });
    return;
  }

  const token = tokenHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
      teamId: number;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    console.error(" Invalid Token:", error);
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
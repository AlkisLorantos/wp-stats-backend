import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
    teamId: number;
  };
}

export const authMiddleware = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  const token = req.cookies.token as string | undefined;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
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
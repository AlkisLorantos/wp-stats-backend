import { AuthRequest } from "./auth";
import { Response, NextFunction } from "express";

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Insufficient role" });
      return;
    }

    next();
  };
};
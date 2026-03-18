import { AuthRequest } from "./auth";
import { Response, NextFunction } from "express";
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;

import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const saveStartingLineupController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getStartingLineupController: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;

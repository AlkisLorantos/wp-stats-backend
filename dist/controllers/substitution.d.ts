import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const createSubstitution: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getGameSubstitutions: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPlayerPlayingTime: (req: AuthRequest, res: Response) => Promise<void>;

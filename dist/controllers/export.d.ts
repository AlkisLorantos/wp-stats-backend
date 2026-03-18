import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const exportPlayersController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const exportGamesController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const exportStatsController: (req: AuthRequest, res: Response) => Promise<void>;

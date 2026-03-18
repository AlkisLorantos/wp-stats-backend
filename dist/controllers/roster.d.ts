import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const assignRoster: (req: AuthRequest, res: Response) => Promise<void>;
export declare const removeFromRoster: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getRoster: (req: AuthRequest, res: Response) => Promise<void>;

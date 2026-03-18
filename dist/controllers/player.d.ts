import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const getAllPlayers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPlayer: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createPlayerController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updatePlayerController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deletePlayerController: (req: AuthRequest, res: Response) => Promise<void>;

import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const getAllGames: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getGame: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createGameController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateGameController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteGameController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const startGameController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const endGameController: (req: AuthRequest, res: Response) => Promise<void>;

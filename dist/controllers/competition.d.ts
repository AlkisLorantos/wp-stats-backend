import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const getCompetitionsController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCompetitionController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createCompetitionController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateCompetitionController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteCompetitionController: (req: AuthRequest, res: Response) => Promise<void>;

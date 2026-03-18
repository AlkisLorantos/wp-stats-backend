import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/client/auth";
export declare const signupTeam: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: Request, res: Response) => Promise<void>;
export declare const getUserController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateTeamNameController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const regenerateApiKeyController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteUserController: (req: AuthRequest, res: Response) => Promise<void>;

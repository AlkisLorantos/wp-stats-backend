import { Response } from "express";
import { AuthRequest } from "../middleware/client/auth";
export declare const savePresetController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPresetsController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPresetController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deletePresetController: (req: AuthRequest, res: Response) => Promise<void>;

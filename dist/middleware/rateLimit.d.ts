import { Request, Response, NextFunction } from "express";
export declare const rateLimitGeneral: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const rateLimitAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;

import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}
export declare const fullAccessOnly: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const adminOnly: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};

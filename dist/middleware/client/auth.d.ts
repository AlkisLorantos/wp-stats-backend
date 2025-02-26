import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};

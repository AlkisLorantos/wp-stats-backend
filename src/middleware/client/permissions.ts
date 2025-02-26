import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: { userId: number; role: string };
}

// Middleware to Restrict Write Access to Full Access Users
export const fullAccessOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "Full") {
        res.status(403).json({ message: "Forbidden: You need 'Full' access to modify data." });
        return;
    }
    next(); 
};

//Allow only Admins
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "Full") {
        res.status(403).json({ message: "Forbidden: Admins only." });
        return;
    }
    next(); 
};
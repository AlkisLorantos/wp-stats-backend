
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
    user?: { userId: number; role: string };
}

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//     const tokenHeader = req.headers.authorization;
//     console.log("📩 Raw Authorization Header:", tokenHeader);

//     if (!tokenHeader) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     const token = tokenHeader.split(" ")[1]; // Extract token
//     console.log("🔑 Extracted Token:", token);

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; role: string };
//         console.log("✅ Decoded Token:", decoded);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error("❌ Invalid Token:", error.message);
//         return res.status(403).json({ message: "Forbidden: Invalid token" });
//     }
// };

// Middleware to verify JWT Token
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const tokenHeader = req.headers.authorization;

    console.log("📩 Raw Authorization Header:", tokenHeader);

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No valid token provided" });
        return;
    }

    // Extract the actual token value
    const token = tokenHeader.replace("Bearer ", "").trim(); 
    console.log("🔑 Extracted Token:", token);

    if (!token) {
        console.log("No Token Provided");
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; role: string };
        console.log("✅ Decoded Token:", decoded);
        req.user = decoded; // Attach user details
        next(); // Continue to the next middleware or route
    } catch (error) {
        console.error("❌ Invalid Token:", error);
        res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
// // Checking user Role
// export const authorizeRoles = (roles: string[]) => {
//     return (req: AuthRequest, res: Response, next:NextFunction) => {
//         if(!req.user) {
//             return res.status(403).json({ message: "Acces denied" })
//         }
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Acces Denied' })
//         }

//         next();//Move to the next habdler
//     }
// };

// // Veryfy the JWT Token
// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token

//     if (!token) {
//         res.status(401).json({ message: "Access denied. No token provided." });
//         return; // Ensure function exits after sending response
//     }

//     try {
//         // Verify the token using the secret key
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; role: string };

//         req.user = decoded; // Attach user details to request
//         next(); // Move to next middleware or route handler
//     } catch (error) {
//         res.status(401).json({ message: "Invalid or expired token." });
//         return; // Ensure function exits after sending response
//     }
// };

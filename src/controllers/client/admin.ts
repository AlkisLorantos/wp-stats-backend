import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.body;

        // Validate Role Selection
        if (!["Read", "Full"].includes(role)) {
            res.status(400).json({ message: "Invalid role. Choose 'Read' or 'Full'." });
            return;
        }

        // Update User Role
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role }
        });

        res.status(200).json({
            message: "User role updated successfully.",
            user: { id: user.id, username: user.username, role: user.role }
        });

    } catch (error) {
        next(error);
    }
};

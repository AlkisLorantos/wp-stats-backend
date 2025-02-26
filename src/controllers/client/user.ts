import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { ALLOWED_USER_ROLES } from "../../utils/constants"; // Role validation

dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        //Check if User Exists
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create User (Default Role: Read)
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role: "Read", //Default role: Read-Only
                createdAt: new Date(),
            }
        });

        return res.status(201).json({
            message: "Registration successful. Waiting for admin role assignment.",
            user: { id: user.id, username: user.username, role: user.role }
        });

    } catch (error) {
        next(error);
    }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        // Find User
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT Token (with Role)
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });

    } catch (error) {
        next(error);
    }
};

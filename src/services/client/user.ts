import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const prisma = new PrismaClient();

// Hash password
const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password
const verifyPassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};

// Generate JWT token with teamId
const generateToken = (userId: number, role: string, teamId: number): string => {
    return jwt.sign(
        { userId, role, teamId },
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN && !isNaN(Number(process.env.JWT_EXPIRES_IN))
                ? Number(process.env.JWT_EXPIRES_IN)
                : "7d",
        }
    );
};

// Create a new team and its first user (coach)
export const createTeamAndCoach = async (username: string, password: string, teamName: string) => {
    const hashedPassword = await hashPassword(password);
    const apiKey = crypto.randomBytes(32).toString("hex");

    const team = await prisma.team.create({
        data: {
            name: teamName,
            users: {
                create: {
                    username,
                    password: hashedPassword,
                    role: "coach",
                    apiKey,
                },
            },
        },
        include: {
            users: true,
        },
    });

    const user = team.users[0];
    const token = generateToken(user.id, user.role, team.id);

    return {
        token,
        apiKey: user.apiKey,
        user: { id: user.id, username: user.username, role: user.role },
        team: { id: team.id, name: team.name },
    };
};

// Authenticate user with team
export const authenticateUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username },
        include: { team: true },
    });

    if (!user || !user.password || !user.team) {
        throw new Error("Invalid username or password");
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        throw new Error("Invalid username or password");
    }

    // Create an API key if missing
    if (!user.apiKey) {
        const newKey = crypto.randomBytes(32).toString("hex");
        await prisma.user.update({ where: { id: user.id }, data: { apiKey: newKey } });
        user.apiKey = newKey;
    }

    const token = generateToken(user.id, user.role, user.teamId);

    return {
        token,
        apiKey: user.apiKey,
        user: { id: user.id, username: user.username, role: user.role },
        team: { id: user.team.id, name: user.team.name },
    };
};
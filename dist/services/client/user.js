"use strict";
// import { Prisma, PrismaClient, User } from "@prisma/client";
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.createUser = void 0;
// const prisma = new PrismaClient();
// type Response = User | { error: string };
// export const createUser = async (data: Prisma.UserCreateInput): Promise<Response> => {
//     const public_key = crypto.randomBytes(127).toString('base64');
//     const secret_key = await jwt.sign(data.username, process.env.TOKEN_SECRET);
//     try {
//         const user = await prisma.user.create({
//             data: {
//                 authId: 1234657890,
//                 joinedAt: new Date(),
//                 scopes: ['player', 'league', 'game'],
//                 apiToken: public_key,
//                 apiSecret: secret_key,
//                 usage: 1,
//                 ...data,
//             }
//         });
//         return user;
//     } catch (err) {
//         if (!(err instanceof Prisma.PrismaClientKnownRequestError)) throw err;
//         let errorMessage: string;
//         switch (err.code) {
//             case "P2002":
//                 errorMessage = `Duplicate field value: ${err.meta.target}`;
//         };
//         return {
//             error: errorMessage
//         };
//     };
// };
// export const deleteUser = async (id: number) => {
//     const user = await prisma.user.delete({
//         where: {
//             id
//         },
//     });
//     return user;
// };
// case 'P2014':
//             // handling invalid id errors
//             return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
//         case 'P2003':
//             // handling invalid data errors
//             return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
//         default:
//             // handling all other errors
//             return new CustomError(`Something went wrong: ${err.message}`, 500);
//     }
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
// Hash password securely using bcrypt
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(password, salt);
};
// Compare hashed passwords securely
const verifyPassword = async (inputPassword, hashedPassword) => {
    return await bcryptjs_1.default.compare(inputPassword, hashedPassword);
};
// Generate JWT token
const generateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN && !isNaN(Number(process.env.JWT_EXPIRES_IN))
            ? Number(process.env.JWT_EXPIRES_IN)
            : "7d",
    });
};
// Create a new user
const createUser = async (username, password, role) => {
    const hashedPassword = await hashPassword(password);
    return await prisma.user.create({
        data: {
            username,
            password: hashedPassword, // Store bcrypt hashed password
            role,
        },
    });
};
exports.createUser = createUser;
// Authenticate user
const authenticateUser = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: { username },
    });
    if (!user || !user.password) {
        throw new Error("Invalid username or password");
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid username or password");
    }
    const token = generateToken(user.id, user.role);
    return { token, user };
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=user.js.map
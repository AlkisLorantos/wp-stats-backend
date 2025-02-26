"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //Check if User Exists
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }
        //Hash Password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
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
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Find User
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Check Password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Generate JWT Token (with Role)
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//# sourceMappingURL=user.js.map
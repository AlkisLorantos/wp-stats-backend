"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.regenerateApiKey = exports.updateTeamName = exports.getUserInfo = exports.authenticateUser = exports.createTeamAndCoach = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../../lib/prisma");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}
const BCRYPT_ROUNDS = 12;
const validatePassword = (password) => {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }
};
const validateUsername = (username) => {
    if (username.length < 3 || username.length > 30) {
        throw new Error("Username must be 3-30 characters");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error("Username can only contain letters, numbers, and underscores");
    }
};
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, BCRYPT_ROUNDS);
};
const verifyPassword = async (inputPassword, hashedPassword) => {
    return bcryptjs_1.default.compare(inputPassword, hashedPassword);
};
const generateToken = (userId, role, teamId) => {
    return jsonwebtoken_1.default.sign({ userId, role, teamId }, JWT_SECRET, { expiresIn: "7d" });
};
const generateApiKey = () => {
    return crypto_1.default.randomBytes(32).toString("hex");
};
const createTeamAndCoach = async (username, password, teamName) => {
    validateUsername(username);
    validatePassword(password);
    if (!teamName || teamName.length < 2 || teamName.length > 50) {
        throw new Error("Team name must be 2-50 characters");
    }
    const [existingTeam, existingUser] = await Promise.all([
        prisma_1.prisma.team.findUnique({ where: { name: teamName } }),
        prisma_1.prisma.user.findUnique({ where: { username } }),
    ]);
    if (existingTeam || existingUser) {
        throw new Error("Team or username already taken");
    }
    const hashedPassword = await hashPassword(password);
    const apiKey = generateApiKey();
    const team = await prisma_1.prisma.team.create({
        data: {
            name: teamName,
            users: {
                create: {
                    username: username.toLowerCase(),
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
exports.createTeamAndCoach = createTeamAndCoach;
const authenticateUser = async (username, password) => {
    const normalizedUsername = username.toLowerCase().trim();
    const user = await prisma_1.prisma.user.findUnique({
        where: { username: normalizedUsername },
        include: { team: true },
    });
    const invalidError = new Error("Invalid username or password");
    if (!user || !user.password || !user.team) {
        await bcryptjs_1.default.hash(password, BCRYPT_ROUNDS);
        throw invalidError;
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        throw invalidError;
    }
    let apiKey = user.apiKey;
    if (!apiKey) {
        apiKey = generateApiKey();
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { apiKey },
        });
    }
    const token = generateToken(user.id, user.role, user.teamId);
    return {
        token,
        apiKey,
        user: { id: user.id, username: user.username, role: user.role },
        team: { id: user.team.id, name: user.team.name },
    };
};
exports.authenticateUser = authenticateUser;
const getUserInfo = async (userId, teamId) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: { id: userId, teamId },
        select: {
            id: true,
            username: true,
            apiKey: true,
            team: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!user)
        throw new Error("User not found");
    return user;
};
exports.getUserInfo = getUserInfo;
const updateTeamName = async (teamId, name) => {
    if (!name || name.length < 2 || name.length > 50) {
        throw new Error("Team name must be 2-50 characters");
    }
    const existing = await prisma_1.prisma.team.findFirst({
        where: { name, id: { not: teamId } },
    });
    if (existing) {
        throw new Error("Team name already taken");
    }
    return await prisma_1.prisma.team.update({
        where: { id: teamId },
        data: { name },
    });
};
exports.updateTeamName = updateTeamName;
const regenerateApiKey = async (userId, teamId) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: { id: userId, teamId },
    });
    if (!user)
        throw new Error("User not found");
    const newApiKey = generateApiKey();
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { apiKey: newApiKey },
    });
    return newApiKey;
};
exports.regenerateApiKey = regenerateApiKey;
const deleteUser = async (userId, teamId) => {
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.statEvent.deleteMany({
            where: { game: { teamId } },
        });
        await tx.startingLineup.deleteMany({
            where: { game: { teamId } },
        });
        await tx.substitution.deleteMany({
            where: { game: { teamId } },
        });
        await tx.gameRoster.deleteMany({
            where: { game: { teamId } },
        });
        await tx.game.deleteMany({
            where: { teamId },
        });
        await tx.player.deleteMany({
            where: { teamId },
        });
        await tx.competition.deleteMany({
            where: { teamId },
        });
        await tx.rosterPreset.deleteMany({
            where: { teamId },
        });
        await tx.user.deleteMany({
            where: { teamId },
        });
        await tx.team.delete({
            where: { id: teamId },
        });
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map
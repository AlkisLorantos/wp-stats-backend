"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.regenerateApiKeyController = exports.updateTeamNameController = exports.getUserController = exports.logout = exports.login = exports.signupTeam = void 0;
const user_1 = require("../../services/auth/user");
const COOKIE_NAME = "token";
const COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
};
const signupTeam = async (req, res, next) => {
    const { username, password, teamName } = req.body;
    if (!username || !password || !teamName) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const result = await (0, user_1.createTeamAndCoach)(username, password, teamName);
        res.cookie(COOKIE_NAME, result.token, COOKIE_OPTS);
        res.status(201).json({
            message: "Team and user created successfully",
            user: result.user,
            team: result.team,
            apiKey: result.apiKey,
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Signup failed" });
    }
};
exports.signupTeam = signupTeam;
const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Missing username or password" });
        return;
    }
    try {
        const result = await (0, user_1.authenticateUser)(username, password);
        res.cookie(COOKIE_NAME, result.token, COOKIE_OPTS);
        res.status(200).json({
            message: "Login successful",
            user: result.user,
            team: result.team,
            apiKey: result.apiKey,
        });
    }
    catch (err) {
        res.status(401).json({ message: "Invalid username or password" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ message: "Logged out" });
};
exports.logout = logout;
const getUserController = async (req, res) => {
    try {
        const user = await (0, user_1.getUserInfo)(req.user.userId, req.user.teamId);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch user info" });
    }
};
exports.getUserController = getUserController;
const updateTeamNameController = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: "Team name is required" });
        return;
    }
    try {
        const team = await (0, user_1.updateTeamName)(req.user.teamId, name);
        res.json({ message: "Team name updated", team });
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Failed to update team name" });
    }
};
exports.updateTeamNameController = updateTeamNameController;
const regenerateApiKeyController = async (req, res) => {
    try {
        const apiKey = await (0, user_1.regenerateApiKey)(req.user.userId, req.user.teamId);
        res.json({ message: "API key regenerated", apiKey });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to regenerate API key" });
    }
};
exports.regenerateApiKeyController = regenerateApiKeyController;
const deleteUserController = async (req, res) => {
    const { confirmText } = req.body;
    if (confirmText !== "DELETE") {
        res.status(400).json({ message: "Please type DELETE to confirm" });
        return;
    }
    try {
        await (0, user_1.deleteUser)(req.user.userId, req.user.teamId);
        res.clearCookie(COOKIE_NAME);
        res.json({ message: "Account deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete account" });
    }
};
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=user.js.map
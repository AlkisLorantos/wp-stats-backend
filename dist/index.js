"use strict";
// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import cors from 'cors';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());
// // Test route
// app.get("/", (req, res) => {
//   res.send("Water Polo Stats API is running...");
// });
// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("../src/routes/index"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/client/user"));
const auth_1 = require("./middleware/client/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/auth", user_1.default); //Routes for client authentication
app.use("/api/protected", auth_1.authMiddleware, (req, res) => {
    res.json({ message: "You have access to this protected route!", user: req.user });
}); //Protected routes
app.use(index_1.default);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//# sourceMappingURL=index.js.map
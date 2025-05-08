import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index";
import AuthRouter from "./routes/client/auth";
import { authMiddleware } from "./middleware/client/auth";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

// Public Auth Routes
app.use("/api/auth", AuthRouter);

// Example protected route
app.use("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: (req as any).user,
  });
});

// Mount all other routes under /api
app.use("/api", router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


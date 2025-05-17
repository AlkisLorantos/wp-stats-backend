import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index";
import AuthRouter from "./routes/client/auth";
import { authMiddleware } from "./middleware/client/auth";
import cokieParser from "cookie-parser";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cokieParser());
app.use(express.json());


app.use("/api/auth", AuthRouter);


app.use("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: (req as any).user,
  });
});


app.use("/api", router);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


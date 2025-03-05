// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import cors from 'cors';

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


import express, { Express, Request, Response, Application } from 'express';
import dotenv from "dotenv"
import router from '../src/routes/index';
import cors from 'cors';
import AuthRouter from './routes/client/auth';
import { authMiddleware } from './middleware/client/auth';


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", AuthRouter); //Routes for client authentication

app.use("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "You have access to this protected route!", user: (req as any).user });
}); //Protected routes

app.use(router);



app.listen(port, () => {

    console.log(`Server running on port: ${port}`);

});
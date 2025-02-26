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
import dotenv from 'dotenv';
import router from '../src/routes/index';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.port || 8000;

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(port, () => {

    console.log(`Server running on port: ${port}`);

});
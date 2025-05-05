// import express from "express";
// import { create } from '../controllers/league

// const router = express.Router()


// router.post('/league', create);

// export default router;

import express from "express";
import { create, update, show, showMany, remove } from "../controllers/league";

const router = express.Router();

router.get("/", async (req, res) => {
    await showMany(req, res);
});

router.get("/:id", async (req, res) => {
    await show(req, res);
});

router.post("/", async (req, res) => {
    await create(req, res);
});

router.put("/:id", async (req, res) => {
    await update(req, res);
});

router.delete("/:id", async (req, res) => {
    await remove(req, res);
});


export default router;

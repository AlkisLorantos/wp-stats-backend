// import { create } from "./create";
// import { show } from "./show";
// import { showMany } from "./showMany";
// import { update } from './update';
// import { remove } from "./remove";

// export {
//     create,
//     show,
//     showMany,
//     update,
//     remove
// };

import { Request, Response } from "express";
import { createPlayer, getPlayer, getPlayers, updatePlayer, removePlayer } from "../../services/player";

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const player = await createPlayer(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const player = await getPlayer(req.params.name);
        if (!player) {
            res.status(404).json({ message: "Player not found" });
            return; // Explicit return to fix TypeScript error
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const showMany = async (req: Request, res: Response): Promise<void> => {
    try {
        const players = await getPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, ...data } = req.body;
        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return; // Explicit return
        }

        const updatedPlayer = await updatePlayer(Number(id), data);
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return; // Explicit return
        }

        await removePlayer(Number(id));
        res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

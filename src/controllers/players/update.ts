// import { Request, Response } from "express";
// import { updatePlayer } from './../../services/player';

// export const update = async (req: Request, res: Response) => {

//     let { id, ...data } = req.body;

//     const player = await updatePlayer(id, data);

//     return res.status(201).json({
//         message: "Player updated",
//         data: player,
//     });

// };

import { Request, Response } from "express";
import { updatePlayer } from "../../services/player";

export const update = async (req: Request, res: Response) => {
    try {
        let { id, ...data } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid or missing player ID" });
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        const updatedPlayer = await updatePlayer(Number(id), data);

        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }

        return res.status(200).json({
            message: "Player updated successfully",
            data: updatedPlayer,
        });

    } catch (error) {
        console.error("Error updating player:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

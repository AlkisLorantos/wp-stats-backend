
// import { Request, Response } from "express";
// import { removePlayer } from "../../services/player";

// export const remove = async (req: Request, res: Response) => {

//     const player = await removePlayer(req.body.id || null);

//     return res.status(200).json({
//         message: "Player removed",
//         data: player,
//     });

// }

import { Request, Response } from "express";
import { removePlayer } from "../../services/player";

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid or missing player ID" });
        }

        const deletedPlayer = await removePlayer(Number(id));

        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }

        return res.status(200).json({
            message: "Player removed successfully",
            data: deletedPlayer,
        });

    } catch (error) {
        console.error("Error removing player:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

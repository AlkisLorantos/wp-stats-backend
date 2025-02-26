// import { Request, Response } from "express";
// import { getPlayer } from "../../services/player";

// export const show = async (req: Request, res: Response) => {

//     const player = await getPlayer(req.params.name.toUpperCase());

//     if (player) {

//         return res.status(200).json({
//             data: player,
//         });

//     };

//     return res.status(404).json({
//         error: 'Player not found',
//     })

// };

// import { Request, Response } from "express";
// import { getPlayer } from "../../services/player";

// export const show = async (req: Request, res: Response) => {
//     try {
//         const { name } = req.params;

//         if (!name) {
//             return res.status(400).json({ message: "Missing player name in request" });
//         }

//         const player = await getPlayer(name.toUpperCase());

//         if (!player) {
//             return res.status(404).json({ error: "Player not found" });
//         }

//         return res.status(200).json({ data: player });

//     } catch (error) {
//         console.error("Error fetching player:", error);
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

import { Request, Response } from "express";
import { getPlayer } from "../../services/player";

export const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.params.name.toUpperCase(); // Convert input to uppercase
        const players = await getPlayer(name);

        if (!players || players.length === 0) {
            res.status(404).json({ message: "No players found" });
            return;
        }

        // If multiple players match, return an array
        res.status(200).json({ data: players });

    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// import { Request, Response } from "express";
// import { createPlayer } from "../../services/player";

// export const create = async (req: Request, res: Response) => {

//     let { birthday, ...rest } = req.body;

//     const [day, month, year] = birthday.split('/');
//     const birthdayDateObject = new Date(`${year}-${month}-${day}`);

//     const playerRecord = await createPlayer({
//         birthday: birthdayDateObject,
//         ...rest
//     });

//     return res.status(201).json({
//         message: "created_player",
//         data: playerRecord
//     });

// };

import { Request, Response } from "express";
import { createPlayer } from "../../services/player";

export const create = async (req: Request, res: Response) => {
    try {
        let { birthday, ...rest } = req.body;

        if (!birthday || typeof birthday !== "string") {
            return res.status(400).json({ message: "Invalid birthday format" });
        }

        const [day, month, year] = birthday.split("/");
        const birthdayDateObject = new Date(`${year}-${month}-${day}`);

        if (isNaN(birthdayDateObject.getTime())) {
            return res.status(400).json({ message: "Invalid date provided" });
        }

        const playerRecord = await createPlayer({
            birthday: birthdayDateObject,
            ...rest
        });

        return res.status(201).json({
            message: "created_player",
            data: playerRecord
        });
    } catch (error) {
        console.error("Error creating player:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

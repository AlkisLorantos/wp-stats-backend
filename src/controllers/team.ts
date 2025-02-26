// import { Request, Response } from "express";
// import { createTeam } from './../services/team';

// export const create = async (req: Request, res: Response) => {

//     const team = await createTeam({
//         ...req.body,
//     });

//     return res.status(201).json({
//         message: "Team created.",
//         data: team
//     });

// };

import { Request, Response } from "express";
import { createTeam } from "../services/team"; 

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const team = await createTeam(req.body); 

        res.status(201).json({
            message: "Team created successfully",
            data: team
        });
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

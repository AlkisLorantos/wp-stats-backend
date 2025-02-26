import { Request, Response } from "express";
import { createLeague } from './../services/league';

export const create = async (req: Request, res: Response) => {

    const league = await createLeague({
        ...req.body,
    });

    return res.status(201).json({
        message: "League created.",
        data: league
    });

};
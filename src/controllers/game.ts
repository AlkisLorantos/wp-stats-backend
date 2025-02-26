import { Request, Response } from "express";
import { createGame, createGameStat } from './../services/game';

export const create = async (req: Request, res: Response) => {

    const game = await createGame({
        ...req.body,
    });

    return res.status(201).json({
        message: "Game created.",
        data: game
    });

};

export const createStats = async (req: Request, res: Response) => {


    const gameStat = await createGameStat({
        ...req.body
    });

    return res.status(201).json({
        message: "GameStat created.",
        data: gameStat
    });

};
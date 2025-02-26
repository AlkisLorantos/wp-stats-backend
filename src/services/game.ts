import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "./prisma";

export const createGame = async (data: Prisma.GameCreateInput) => {

    const game = await prisma.game.create({
        data: { ...data },
    });

    return game;

};


export const getGame = async (id: number) => {

    if (id !== null) {

        const game = await prisma.game.findUnique({
            where: {
                id: id,
            }
        });
    
        return game;

    };

    const games = await prisma.game.findMany();

    return games;

};

export const updateGame = async (id: number, data: Prisma.GameUpdateInput) => {

    const game = await prisma.game.update({
        where: { id: id },
        data: { ...data }
    });

    return game;

};

export const removeGame = async (id: number) => {

    const game = prisma.game.delete({
        where: { id: id }
    });

    return game;

};

export const createGameStat = async (data: Prisma.GameStatCreateInput) => {

    const gameStat = await prisma.gameStat.create({
        data: { ...data },
    });

    return gameStat;

};

export const getGameStat = async (id: number) => {

    if (id !== null) {

        const gameStat = await prisma.gameStat.findUnique({
            where: {
                id: id,
            }
        });
    
        return gameStat;

    };

    const gameStats = await prisma.gameStat.findMany();

    return gameStats;

};

export const updateGameStats = async (id: number, data: Prisma.GameStatUpdateInput) => {

    const gameStat = await prisma.gameStat.update({
        where: { id: id },
        data: { ...data }
    });

    return gameStat;

};

export const removeGameStats = async (id: number) => {

    const gameStat = prisma.gameStat.delete({
        where: { id: id }
    });

    return gameStat;

};

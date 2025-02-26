import { Prisma, PrismaClient } from "@prisma/client";
import isCountry from '../utils/isCountry';
import isValidDate from '../utils/isValidDate';
import prisma from "./prisma";

export const createPlayer = async (data: Prisma.PlayerCreateInput) => {

    const parsedData = { ...data };

    for (const key in parsedData) {

        if (typeof parsedData[key] == 'string') {

            parsedData[key] = parsedData[key].toUpperCase();

        };

    };

    const player = await prisma.player.create({
        data: { 
            name: `${parsedData.firstName} ${parsedData.lastName}`,
            ...parsedData
        },
    });

    return player;

};


export const getPlayer = async (name: string) => {
    try {
        const players = await prisma.player.findMany({
            where: {
                OR: [
                    { name: { equals: name.toUpperCase(), mode: "insensitive" } }, // Match Full Name
                    { firstName: { equals: name.toUpperCase(), mode: "insensitive" } }, // Match First Name
                    { lastName: { equals: name.toUpperCase(), mode: "insensitive" } } // Match Last Name
                ]
            }
        });

        return players;
    } catch (error) {
        console.error("Error fetching player:", error);
        throw error;
    }
};

export const getPlayers = async (params?: Prisma.PlayerWhereInput) => {

    const players = await prisma.player.findMany({
        where: {
            ...params
        },
    });

    return players;

};

export const updatePlayer = async (id: number, data: Prisma.PlayerUpdateInput) => {

    const player = await prisma.player.update({
        where: { id: id },
        data: { ...data }
    });

    return player;

};

export const removePlayer = async (id: number) => {

    const player = prisma.player.delete({
        where: { id: id }
    });

    return player;

};
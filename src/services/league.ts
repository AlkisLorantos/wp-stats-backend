import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "./prisma";

export const createLeague = async (data: Prisma.LeagueCreateInput) => {

    const team = await prisma.league.create({
        data: { ...data },
    });

    return team;

};

export const getLeague = async (id: number) => {

    if (id !== null) {

        const league = await prisma.league.findUnique({
            where: {
                id: id,
            }
        });
    
        return league;

    };

    const leagues = await prisma.league.findMany();

    return leagues;

};

export const updateLeague = async (id: number, data: Prisma.LeagueUpdateInput) => {

    const league = await prisma.league.update({
        where: { id: id },
        data: { ...data }
    });

    return league;

};

export const removeLeague = async (id: number) => {

    const league = prisma.league.delete({
        where: { id: id }
    });

    return league;

};
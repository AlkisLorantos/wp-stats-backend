import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "./prisma";

export const createTeam = async (data: Prisma.TeamCreateInput) => {
    try {
        const team = await prisma.team.create({
            data: { ...data }
        });

        return team;
    } catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
};

// export const getTeam = async (id: number) => {

//     if (id !== null) {

//         const team = await prisma.team.findUnique({
//             where: {
//                 id: id,
//             }
//         });
    
//         return team;

//     };

//     const teams = await prisma.team.findMany();

//     return teams;

// };

export const getTeam = async (id: number) => {
    try {
        if (!id || isNaN(Number(id))) {
            throw new Error("Invalid or missing team ID");
        }

        const team = await prisma.team.findUnique({
            where: { id },
        });

        if (!team) {
            throw new Error("Team not found");
        }

        return team;
    } catch (error) {
        console.error("Error fetching team:", error);
        throw new Error(error.message);
    }
};

export const getTeams = async () => {
    try {
        return await prisma.team.findMany();
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Failed to fetch teams");
    }
};

export const updateTeam = async (id: number, data: Prisma.TeamUpdateInput) => {
    try {
        if (!id || isNaN(Number(id))) {
            throw new Error("Invalid or missing team ID");
        }

        return await prisma.team.update({
            where: { id },
            data,
        });
    } catch (error) {
        console.error("Error updating team:", error);
        throw new Error(error.message);
    }
};

export const removeTeam = async (id: number) => {
    try {
        if (!id || isNaN(Number(id))) {
            throw new Error("Invalid or missing team ID");
        }

        return await prisma.team.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting team:", error);
        throw new Error("Failed to delete team");
    }
};
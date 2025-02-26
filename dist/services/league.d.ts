import { Prisma } from "@prisma/client";
export declare const createLeague: (data: Prisma.LeagueCreateInput) => Promise<{
    name: string;
    id: number;
    country: string;
}>;
export declare const getLeague: (id: number) => Promise<{
    name: string;
    id: number;
    country: string;
} | {
    name: string;
    id: number;
    country: string;
}[]>;
export declare const updateLeague: (id: number, data: Prisma.LeagueUpdateInput) => Promise<{
    name: string;
    id: number;
    country: string;
}>;
export declare const removeLeague: (id: number) => Promise<{
    name: string;
    id: number;
    country: string;
}>;

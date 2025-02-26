import { Prisma } from "@prisma/client";
export declare const createTeam: (data: Prisma.TeamCreateInput) => Promise<{
    name: string;
    id: number;
    leagueId: number;
}>;
export declare const getTeam: (id: number) => Promise<{
    name: string;
    id: number;
    leagueId: number;
}>;
export declare const getTeams: () => Promise<{
    name: string;
    id: number;
    leagueId: number;
}[]>;
export declare const updateTeam: (id: number, data: Prisma.TeamUpdateInput) => Promise<{
    name: string;
    id: number;
    leagueId: number;
}>;
export declare const removeTeam: (id: number) => Promise<{
    name: string;
    id: number;
    leagueId: number;
}>;

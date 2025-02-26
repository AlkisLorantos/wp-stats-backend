import { Prisma } from "@prisma/client";
export declare const createPlayer: (data: Prisma.PlayerCreateInput) => Promise<{
    name: string;
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    nationality: string;
    position: string;
    capNumber: number;
    teamId: number | null;
}>;
export declare const getPlayer: (name: string) => Promise<{
    name: string;
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    nationality: string;
    position: string;
    capNumber: number;
    teamId: number | null;
}[]>;
export declare const getPlayers: (params?: Prisma.PlayerWhereInput) => Promise<{
    name: string;
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    nationality: string;
    position: string;
    capNumber: number;
    teamId: number | null;
}[]>;
export declare const updatePlayer: (id: number, data: Prisma.PlayerUpdateInput) => Promise<{
    name: string;
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    nationality: string;
    position: string;
    capNumber: number;
    teamId: number | null;
}>;
export declare const removePlayer: (id: number) => Promise<{
    name: string;
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    nationality: string;
    position: string;
    capNumber: number;
    teamId: number | null;
}>;

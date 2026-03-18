import { z } from "zod";
export declare const createGameSchema: z.ZodObject<{
    opponent: z.ZodString;
    date: z.ZodUnion<[z.ZodString, z.ZodString]>;
    location: z.ZodOptional<z.ZodString>;
    homeOrAway: z.ZodOptional<z.ZodEnum<{
        HOME: "HOME";
        AWAY: "AWAY";
    }>>;
}, z.core.$strip>;
export declare const updateGameSchema: z.ZodObject<{
    opponent: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
    location: z.ZodOptional<z.ZodString>;
    homeOrAway: z.ZodOptional<z.ZodEnum<{
        HOME: "HOME";
        AWAY: "AWAY";
    }>>;
    teamScore: z.ZodOptional<z.ZodNumber>;
    opponentScore: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

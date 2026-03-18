import { z } from "zod";
export declare const createStatSchema: z.ZodObject<{
    playerId: z.ZodNumber;
    type: z.ZodEnum<{
        GOAL: "GOAL";
        SHOT: "SHOT";
        ASSIST: "ASSIST";
        STEAL: "STEAL";
        TURNOVER: "TURNOVER";
        BLOCK: "BLOCK";
        EXCLUSION: "EXCLUSION";
        SAVE: "SAVE";
    }>;
    x: z.ZodOptional<z.ZodNumber>;
    y: z.ZodOptional<z.ZodNumber>;
    capNumber: z.ZodOptional<z.ZodNumber>;
    context: z.ZodOptional<z.ZodEnum<{
        SIX_ON_SIX: "SIX_ON_SIX";
        MAN_UP: "MAN_UP";
        MAN_DOWN: "MAN_DOWN";
        COUNTER: "COUNTER";
        PENALTY: "PENALTY";
    }>>;
    period: z.ZodOptional<z.ZodNumber>;
    clock: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const createShotSchema: z.ZodObject<{
    playerId: z.ZodNumber;
    x: z.ZodNumber;
    y: z.ZodNumber;
    goalX: z.ZodOptional<z.ZodNumber>;
    goalY: z.ZodOptional<z.ZodNumber>;
    shotOutcome: z.ZodEnum<{
        POST: "POST";
        GOAL: "GOAL";
        SAVED: "SAVED";
        MISSED: "MISSED";
        BLOCKED: "BLOCKED";
    }>;
    assisterId: z.ZodOptional<z.ZodNumber>;
    period: z.ZodNumber;
    clock: z.ZodNumber;
    context: z.ZodOptional<z.ZodEnum<{
        SIX_ON_SIX: "SIX_ON_SIX";
        MAN_UP: "MAN_UP";
        MAN_DOWN: "MAN_DOWN";
        COUNTER: "COUNTER";
        PENALTY: "PENALTY";
    }>>;
}, z.core.$strip>;
export declare const updateStatSchema: z.ZodObject<{
    playerId: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        GOAL: "GOAL";
        SHOT: "SHOT";
        ASSIST: "ASSIST";
        STEAL: "STEAL";
        TURNOVER: "TURNOVER";
        BLOCK: "BLOCK";
        EXCLUSION: "EXCLUSION";
        SAVE: "SAVE";
    }>>;
    x: z.ZodOptional<z.ZodNumber>;
    y: z.ZodOptional<z.ZodNumber>;
    context: z.ZodOptional<z.ZodEnum<{
        SIX_ON_SIX: "SIX_ON_SIX";
        MAN_UP: "MAN_UP";
        MAN_DOWN: "MAN_DOWN";
        COUNTER: "COUNTER";
        PENALTY: "PENALTY";
    }>>;
    period: z.ZodOptional<z.ZodNumber>;
    clock: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

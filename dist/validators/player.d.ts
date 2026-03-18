import { z } from "zod";
export declare const createPlayerSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    position: z.ZodOptional<z.ZodString>;
    capNumber: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updatePlayerSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    capNumber: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

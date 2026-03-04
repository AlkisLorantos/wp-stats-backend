import { z } from "zod";

export const createPlayerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  position: z.string().max(50).optional(),
  capNumber: z.number().min(1).max(99).optional(),
});

export const updatePlayerSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  position: z.string().max(50).optional(),
  capNumber: z.number().min(1).max(99).optional(),
});
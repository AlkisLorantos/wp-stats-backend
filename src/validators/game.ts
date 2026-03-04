import { z } from "zod";

export const createGameSchema = z.object({
  opponent: z.string().min(1).max(100),
  date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  location: z.string().max(100).optional(),
  homeOrAway: z.enum(["HOME", "AWAY"]).optional(),
});

export const updateGameSchema = z.object({
  opponent: z.string().min(1).max(100).optional(),
  date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  location: z.string().max(100).optional(),
  homeOrAway: z.enum(["HOME", "AWAY"]).optional(),
  teamScore: z.number().min(0).optional(),
  opponentScore: z.number().min(0).optional(),
});
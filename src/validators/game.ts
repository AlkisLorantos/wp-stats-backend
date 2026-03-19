import { z } from "zod";

export const createGameSchema = z.object({
  opponent: z.string().min(1).max(100),
  date: z.string(),
  location: z.string().max(100).optional().nullable(),
  homeOrAway: z.enum(["home", "away"]).optional().nullable(),
  competitionId: z.number().optional().nullable(),
});

export const updateGameSchema = z.object({
  opponent: z.string().min(1).max(100).optional(),
  date: z.string().optional(),
  location: z.string().max(100).optional().nullable(),
  homeOrAway: z.enum(["home", "away"]).optional().nullable(),
  teamScore: z.number().min(0).optional(),
  opponentScore: z.number().min(0).optional(),
});
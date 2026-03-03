import { z } from "zod";

export const createStatSchema = z.object({
  playerId: z.number().positive(),
  type: z.enum(["GOAL", "SHOT", "STEAL", "BLOCK", "SAVE", "EXCLUSION", "TURNOVER", "ASSIST"]),
  x: z.number().optional(),
  y: z.number().optional(),
  capNumber: z.number().positive().optional(),
  context: z.enum(["SIX_ON_SIX", "MAN_UP", "MAN_DOWN", "COUNTER", "PENALTY"]).optional(),
  period: z.number().min(1).max(4).optional(),
  clock: z.number().min(0).max(8).optional(),
});

export const createShotSchema = z.object({
  playerId: z.number().positive(),
  x: z.number().min(0).max(25),
  y: z.number().min(0).max(20),
  goalX: z.number().min(0).max(3).optional(),
  goalY: z.number().min(0).max(0.9).optional(),
  shotOutcome: z.enum(["GOAL", "SAVED", "MISSED", "BLOCKED", "POST"]),
  assisterId: z.number().positive().optional(),
  period: z.number().min(1).max(4),
  clock: z.number().min(0).max(8),
  context: z.enum(["SIX_ON_SIX", "MAN_UP", "MAN_DOWN", "COUNTER", "PENALTY"]).optional(),
});

export const updateStatSchema = z.object({
  playerId: z.number().positive().optional(),
  type: z.enum(["GOAL", "SHOT", "STEAL", "BLOCK", "SAVE", "EXCLUSION", "TURNOVER", "ASSIST"]).optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  context: z.enum(["SIX_ON_SIX", "MAN_UP", "MAN_DOWN", "COUNTER", "PENALTY"]).optional(),
  period: z.number().min(1).max(4).optional(),
  clock: z.number().min(0).max(8).optional(),
});
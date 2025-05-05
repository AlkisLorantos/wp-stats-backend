import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Save a preset
export const createRosterPreset = async (
  teamId: number,
  name: string,
  roster: { playerId: number; capNumber: number }[]
) => {
  return await prisma.rosterPreset.create({
    data: {
      name,
      team: { connect: { id: teamId } },
      players: {
        create: roster.map((p) => ({
          player: { connect: { id: p.playerId } },
          capNumber: p.capNumber,
        })),
      },
    },
  });
};

// Fetch all presets for team
export const getRosterPresets = async (teamId: number) => {
  return prisma.rosterPreset.findMany({
    where: { teamId },
    include: {
      players: {
        include: { player: true },
      },
    },
  });
};

// Get one preset by ID
export const getPresetById = async (presetId: number, teamId: number) => {
  return prisma.rosterPreset.findFirst({
    where: { id: presetId, teamId },
    include: {
      players: {
        include: { player: true },
      },
    },
  });
};
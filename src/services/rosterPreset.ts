import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const deleteRosterPreset = async (presetId: number, teamId: number) => {
  const preset = await prisma.rosterPreset.findFirst({
    where: { id: presetId, teamId },
  });

  if (!preset) throw new Error("Preset not found or unauthorized");

  await prisma.rosterPresetPlayer.deleteMany({
    where: { presetId },
  });

  return prisma.rosterPreset.delete({
    where: { id: presetId },
  });
};
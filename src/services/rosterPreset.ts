import { prisma } from "../lib/prisma";

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
  const presets = await prisma.rosterPreset.findMany({
    where: { teamId },
    include: {
      players: {
        include: {
          player: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              capNumber: true,
            }
          }
        },
      },
    },
  });

  return presets.map(preset => ({
    ...preset,
    players: preset.players.map(p => ({
      ...p,
      player: {
        ...p.player,
        name: `${p.player.firstName} ${p.player.lastName}`,
      }
    }))
  }));
};

export const getPresetById = async (presetId: number, teamId: number) => {
  const preset = await prisma.rosterPreset.findFirst({
    where: { id: presetId, teamId },
    include: {
      players: {
        include: {
          player: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              capNumber: true,
            }
          }
        },
      },
    },
  });

  if (!preset) return null;

  return {
    ...preset,
    players: preset.players.map(p => ({
      ...p,
      player: {
        ...p.player,
        name: `${p.player.firstName} ${p.player.lastName}`,
      }
    }))
  };
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
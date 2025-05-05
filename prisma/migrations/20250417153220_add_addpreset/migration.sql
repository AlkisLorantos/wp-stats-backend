/*
  Warnings:

  - A unique constraint covering the columns `[gameId,capNumber]` on the table `GameRoster` will be added. If there are existing duplicate values, this will fail.
  - Made the column `capNumber` on table `GameRoster` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GameRoster" ALTER COLUMN "capNumber" SET NOT NULL;

-- CreateTable
CREATE TABLE "RosterPreset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RosterPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RosterPresetPlayer" (
    "id" SERIAL NOT NULL,
    "presetId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "capNumber" INTEGER NOT NULL,

    CONSTRAINT "RosterPresetPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RosterPresetPlayer_presetId_capNumber_key" ON "RosterPresetPlayer"("presetId", "capNumber");

-- CreateIndex
CREATE UNIQUE INDEX "GameRoster_gameId_capNumber_key" ON "GameRoster"("gameId", "capNumber");

-- AddForeignKey
ALTER TABLE "RosterPreset" ADD CONSTRAINT "RosterPreset_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RosterPresetPlayer" ADD CONSTRAINT "RosterPresetPlayer_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "RosterPreset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RosterPresetPlayer" ADD CONSTRAINT "RosterPresetPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

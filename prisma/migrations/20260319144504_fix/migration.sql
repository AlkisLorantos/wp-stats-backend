/*
  Warnings:

  - A unique constraint covering the columns `[teamId,name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'SHOT_CLOCK_VIOLATION';

-- DropIndex
DROP INDEX "Player_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Player_teamId_name_key" ON "Player"("teamId", "name");

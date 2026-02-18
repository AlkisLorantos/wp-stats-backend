/*
  Warnings:

  - The `context` column on the `StatEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[assistEventId]` on the table `StatEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "GameSituation" AS ENUM ('SIX_ON_SIX', 'MAN_UP', 'MAN_DOWN', 'COUNTER', 'PENALTY');

-- CreateEnum
CREATE TYPE "ShotOutcome" AS ENUM ('GOAL', 'SAVED', 'MISSED', 'BLOCKED', 'POST');

-- AlterTable
ALTER TABLE "StatEvent" ADD COLUMN     "assistEventId" INTEGER,
ADD COLUMN     "shotOutcome" "ShotOutcome",
DROP COLUMN "context",
ADD COLUMN     "context" "GameSituation";

-- CreateIndex
CREATE UNIQUE INDEX "StatEvent_assistEventId_key" ON "StatEvent"("assistEventId");

-- AddForeignKey
ALTER TABLE "StatEvent" ADD CONSTRAINT "StatEvent_assistEventId_fkey" FOREIGN KEY ("assistEventId") REFERENCES "StatEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

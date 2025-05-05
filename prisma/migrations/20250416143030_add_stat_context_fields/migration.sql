/*
  Warnings:

  - You are about to drop the column `awayTeamExclusions` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamMisses` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamScore` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamShots` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `awayTeamTurnovers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamExclusions` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamMisses` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamScore` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamShots` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamTurnovers` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `GameStat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `League` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `opponent` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Made the column `teamId` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `teamId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "GameStat" DROP CONSTRAINT "GameStat_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameStat" DROP CONSTRAINT "GameStat_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_leagueId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "awayTeamExclusions",
DROP COLUMN "awayTeamId",
DROP COLUMN "awayTeamMisses",
DROP COLUMN "awayTeamScore",
DROP COLUMN "awayTeamShots",
DROP COLUMN "awayTeamTurnovers",
DROP COLUMN "homeTeamExclusions",
DROP COLUMN "homeTeamId",
DROP COLUMN "homeTeamMisses",
DROP COLUMN "homeTeamScore",
DROP COLUMN "homeTeamShots",
DROP COLUMN "homeTeamTurnovers",
DROP COLUMN "leagueId",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "opponent" TEXT NOT NULL,
ADD COLUMN     "opponentScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "teamId" INTEGER NOT NULL,
ADD COLUMN     "teamScore" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "nationality",
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "capNumber" DROP NOT NULL,
ALTER COLUMN "teamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "leagueId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamId" INTEGER NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'coach';

-- DropTable
DROP TABLE "GameStat";

-- DropTable
DROP TABLE "League";

-- CreateTable
CREATE TABLE "StatEvent" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "context" TEXT,
    "period" INTEGER,
    "clock" DOUBLE PRECISION,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "capNumber" INTEGER,
    "playerId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "StatEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatEvent" ADD CONSTRAINT "StatEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatEvent" ADD CONSTRAINT "StatEvent_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

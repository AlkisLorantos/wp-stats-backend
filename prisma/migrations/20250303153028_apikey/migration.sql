-- DropForeignKey
ALTER TABLE "GameStat" DROP CONSTRAINT "GameStat_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameStat" DROP CONSTRAINT "GameStat_playerId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "awayTeamExclusions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "awayTeamMisses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "awayTeamShots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "awayTeamTurnovers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeTeamExclusions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeTeamMisses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeTeamShots" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeTeamTurnovers" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "homeTeamScore" SET DEFAULT 0,
ALTER COLUMN "awayTeamScore" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "GameStat" ALTER COLUMN "shotsMissed" SET DEFAULT 0,
ALTER COLUMN "shotsScored" SET DEFAULT 0,
ALTER COLUMN "assists" SET DEFAULT 0,
ALTER COLUMN "exclusions" SET DEFAULT 0,
ALTER COLUMN "turnovers" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apiKey" TEXT;

-- AddForeignKey
ALTER TABLE "GameStat" ADD CONSTRAINT "GameStat_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStat" ADD CONSTRAINT "GameStat_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

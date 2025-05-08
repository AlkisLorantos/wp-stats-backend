-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('UPCOMING', 'LIVE', 'ENDED');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'UPCOMING',
ALTER COLUMN "homeOrAway" DROP NOT NULL;

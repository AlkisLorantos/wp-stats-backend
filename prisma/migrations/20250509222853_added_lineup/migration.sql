-- CreateTable
CREATE TABLE "StartingLineup" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "StartingLineup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StartingLineup" ADD CONSTRAINT "StartingLineup_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartingLineup" ADD CONSTRAINT "StartingLineup_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

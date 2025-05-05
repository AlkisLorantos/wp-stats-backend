-- CreateTable
CREATE TABLE "GameRoster" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "capNumber" INTEGER,

    CONSTRAINT "GameRoster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameRoster_gameId_playerId_key" ON "GameRoster"("gameId", "playerId");

-- AddForeignKey
ALTER TABLE "GameRoster" ADD CONSTRAINT "GameRoster_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRoster" ADD CONSTRAINT "GameRoster_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

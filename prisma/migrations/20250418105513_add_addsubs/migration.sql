-- CreateTable
CREATE TABLE "Substitution" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "playerInId" INTEGER NOT NULL,
    "playerOutId" INTEGER NOT NULL,

    CONSTRAINT "Substitution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_playerInId_fkey" FOREIGN KEY ("playerInId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Substitution" ADD CONSTRAINT "Substitution_playerOutId_fkey" FOREIGN KEY ("playerOutId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

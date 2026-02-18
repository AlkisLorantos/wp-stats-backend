/*
  Warnings:

  - Changed the type of `type` on the `StatEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('GOAL', 'SHOT', 'ASSIST', 'STEAL', 'TURNOVER', 'BLOCK', 'EXCLUSION', 'PENALTY_SHOT');

-- AlterTable
ALTER TABLE "StatEvent" DROP COLUMN "type",
ADD COLUMN     "type" "EventType" NOT NULL;

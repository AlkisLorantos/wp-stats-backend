/*
  Warnings:

  - Added the required column `teamId` to the `Substitution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Substitution" ADD COLUMN     "teamId" INTEGER NOT NULL;

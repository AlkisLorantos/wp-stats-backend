/*
  Warnings:

  - Added the required column `season` to the `League` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "League" ADD COLUMN     "season" TEXT NOT NULL;

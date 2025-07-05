/*
  Warnings:

  - You are about to drop the column `progressid` on the `Topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_progressid_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "progressid";

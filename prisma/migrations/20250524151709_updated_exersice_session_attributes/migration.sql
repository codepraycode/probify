/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `ExerciseReport` table. All the data in the column will be lost.
  - Added the required column `duration` to the `ExerciseSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseReport" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ExerciseSession" ADD COLUMN     "duration" INTEGER NOT NULL,
ALTER COLUMN "minutes" DROP NOT NULL,
ALTER COLUMN "seconds" DROP NOT NULL;

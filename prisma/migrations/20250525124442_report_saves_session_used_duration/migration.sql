/*
  Warnings:

  - You are about to drop the column `minutes` on the `ExerciseSession` table. All the data in the column will be lost.
  - You are about to drop the column `seconds` on the `ExerciseSession` table. All the data in the column will be lost.
  - Added the required column `minutes` to the `ExerciseReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seconds` to the `ExerciseReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseReport" ADD COLUMN     "minutes" INTEGER NOT NULL,
ADD COLUMN     "seconds" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExerciseSession" DROP COLUMN "minutes",
DROP COLUMN "seconds";

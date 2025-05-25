/*
  Warnings:

  - Added the required column `questions` to the `ExerciseSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseSession" ADD COLUMN     "questions" INTEGER NOT NULL,
ADD COLUMN     "topics" TEXT[],
ADD COLUMN     "type" "QuestionType"[];

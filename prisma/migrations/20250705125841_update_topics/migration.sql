/*
  Warnings:

  - You are about to drop the `_ExerciseSessionToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseSessionToTopic" DROP CONSTRAINT "_ExerciseSessionToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseSessionToTopic" DROP CONSTRAINT "_ExerciseSessionToTopic_B_fkey";

-- DropTable
DROP TABLE "_ExerciseSessionToTopic";

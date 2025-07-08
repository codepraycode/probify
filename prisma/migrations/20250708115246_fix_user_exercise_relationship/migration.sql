/*
  Warnings:

  - You are about to drop the `_ExerciseSessionToTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseSessionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseReport" DROP CONSTRAINT "ExerciseReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseSessionToTopic" DROP CONSTRAINT "_ExerciseSessionToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseSessionToTopic" DROP CONSTRAINT "_ExerciseSessionToTopic_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseSessionToUser" DROP CONSTRAINT "_ExerciseSessionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseSessionToUser" DROP CONSTRAINT "_ExerciseSessionToUser_B_fkey";

-- DropTable
DROP TABLE "_ExerciseSessionToTopic";

-- DropTable
DROP TABLE "_ExerciseSessionToUser";

-- AddForeignKey
ALTER TABLE "ExerciseSession" ADD CONSTRAINT "ExerciseSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseReport" ADD CONSTRAINT "ExerciseReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `topics` on the `Topic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,topicSlug]` on the table `TopicProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "topics",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "progressid" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TopicProgress" ALTER COLUMN "score" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_ExerciseSessionToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseSessionToTopic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseSessionToTopic_B_index" ON "_ExerciseSessionToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "TopicProgress_userId_topicSlug_key" ON "TopicProgress"("userId", "topicSlug");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_progressid_fkey" FOREIGN KEY ("progressid") REFERENCES "TopicProgress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseSessionToTopic" ADD CONSTRAINT "_ExerciseSessionToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "ExerciseSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseSessionToTopic" ADD CONSTRAINT "_ExerciseSessionToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

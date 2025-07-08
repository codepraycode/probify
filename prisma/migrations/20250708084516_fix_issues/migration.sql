-- DropForeignKey
ALTER TABLE "ExerciseSession" DROP CONSTRAINT "ExerciseSession_userId_fkey";

-- CreateTable
CREATE TABLE "_ExerciseSessionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseSessionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseSessionToUser_B_index" ON "_ExerciseSessionToUser"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseSessionToUser" ADD CONSTRAINT "_ExerciseSessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExerciseSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseSessionToUser" ADD CONSTRAINT "_ExerciseSessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

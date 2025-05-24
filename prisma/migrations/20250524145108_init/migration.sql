-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('mcq', 'fill');

-- CreateTable
CREATE TABLE "ExerciseSession" (
    "id" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "seconds" INTEGER NOT NULL,
    "reportid" TEXT,

    CONSTRAINT "ExerciseSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseReport" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedAnswer" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "selected" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "hint" TEXT NOT NULL,

    CONSTRAINT "SubmittedAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseSession" ADD CONSTRAINT "ExerciseSession_reportid_fkey" FOREIGN KEY ("reportid") REFERENCES "ExerciseReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedAnswer" ADD CONSTRAINT "SubmittedAnswer_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ExerciseReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('mcq', 'fill');

-- CreateTable
CREATE TABLE "ExerciseSession" (
    "id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "questions" INTEGER NOT NULL,
    "topics" TEXT[],
    "type" "QuestionType"[],
    "reportId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseReport" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "duration" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "topics" JSONB NOT NULL,
    "types" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSession_reportId_key" ON "ExerciseSession"("reportId");

-- AddForeignKey
ALTER TABLE "ExerciseSession" ADD CONSTRAINT "ExerciseSession_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ExerciseReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

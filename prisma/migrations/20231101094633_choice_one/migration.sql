/*
  Warnings:

  - You are about to drop the `ChoiceAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChoiceAnswer" DROP CONSTRAINT "ChoiceAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ChoiceAnswer" DROP CONSTRAINT "ChoiceAnswer_teacherId_fkey";

-- DropTable
DROP TABLE "ChoiceAnswer";

-- CreateTable
CREATE TABLE "choice_answer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "choice_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "choice_answer" ADD CONSTRAINT "choice_answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "choice_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choice_answer" ADD CONSTRAINT "choice_answer_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

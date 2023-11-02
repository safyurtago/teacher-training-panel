/*
  Warnings:

  - You are about to drop the `WriteQuestionApply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WriteQuestionApply" DROP CONSTRAINT "WriteQuestionApply_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "WriteQuestionApply" DROP CONSTRAINT "WriteQuestionApply_writeQuestionId_fkey";

-- DropTable
DROP TABLE "WriteQuestionApply";

-- CreateTable
CREATE TABLE "write_question_apply" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "write_question_apply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "write_question_apply" ADD CONSTRAINT "write_question_apply_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "write_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "write_question_apply" ADD CONSTRAINT "write_question_apply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

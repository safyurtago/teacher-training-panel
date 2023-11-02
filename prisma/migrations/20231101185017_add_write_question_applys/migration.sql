/*
  Warnings:

  - You are about to drop the `ChoiceAnswerApply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherPersonalInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChoiceAnswerApply" DROP CONSTRAINT "ChoiceAnswerApply_answerId_fkey";

-- DropForeignKey
ALTER TABLE "ChoiceAnswerApply" DROP CONSTRAINT "ChoiceAnswerApply_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherPersonalInfo" DROP CONSTRAINT "TeacherPersonalInfo_teacherId_fkey";

-- DropTable
DROP TABLE "ChoiceAnswerApply";

-- DropTable
DROP TABLE "TeacherPersonalInfo";

-- CreateTable
CREATE TABLE "choice_answer_apply" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "is_correct" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "choice_answer_apply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "write_question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "write_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WriteQuestionApply" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "writeQuestionId" TEXT NOT NULL,

    CONSTRAINT "WriteQuestionApply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_personal_info" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "nationality" TEXT,
    "gender" TEXT,
    "birthDate" TEXT,
    "passport_serial" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_personal_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "choice_answer_apply" ADD CONSTRAINT "choice_answer_apply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choice_answer_apply" ADD CONSTRAINT "choice_answer_apply_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "choice_answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WriteQuestionApply" ADD CONSTRAINT "WriteQuestionApply_writeQuestionId_fkey" FOREIGN KEY ("writeQuestionId") REFERENCES "write_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WriteQuestionApply" ADD CONSTRAINT "WriteQuestionApply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_personal_info" ADD CONSTRAINT "teacher_personal_info_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

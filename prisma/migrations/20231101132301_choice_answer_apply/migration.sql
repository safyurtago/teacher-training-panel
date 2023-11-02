-- CreateTable
CREATE TABLE "ChoiceAnswerApply" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "ChoiceAnswerApply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChoiceAnswerApply" ADD CONSTRAINT "ChoiceAnswerApply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoiceAnswerApply" ADD CONSTRAINT "ChoiceAnswerApply_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "choice_answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

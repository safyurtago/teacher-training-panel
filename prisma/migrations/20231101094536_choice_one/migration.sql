-- CreateTable
CREATE TABLE "choice_question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "correct_choice" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "choice_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoiceAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ChoiceAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChoiceAnswer" ADD CONSTRAINT "ChoiceAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "choice_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoiceAnswer" ADD CONSTRAINT "ChoiceAnswer_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

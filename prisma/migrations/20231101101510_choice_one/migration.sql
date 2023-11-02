/*
  Warnings:

  - Changed the type of `correct_choice` on the `choice_question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "choice_question" DROP COLUMN "correct_choice",
ADD COLUMN     "correct_choice" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CorrectChoiceType";

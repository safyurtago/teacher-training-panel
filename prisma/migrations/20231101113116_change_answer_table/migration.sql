/*
  Warnings:

  - You are about to drop the column `teacherId` on the `choice_answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "choice_answer" DROP CONSTRAINT "choice_answer_teacherId_fkey";

-- AlterTable
ALTER TABLE "choice_answer" DROP COLUMN "teacherId";

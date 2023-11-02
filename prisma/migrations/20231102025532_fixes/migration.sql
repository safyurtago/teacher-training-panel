/*
  Warnings:

  - Added the required column `value` to the `write_question_apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "write_question_apply" ADD COLUMN     "is_correct" BOOLEAN,
ADD COLUMN     "value" TEXT NOT NULL;

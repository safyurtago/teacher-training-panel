/*
  Warnings:

  - Changed the type of `value` on the `task_criteria` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "task_criteria" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;

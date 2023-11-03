/*
  Warnings:

  - You are about to drop the column `values` on the `task_criteria` table. All the data in the column will be lost.
  - Added the required column `value` to the `task_criteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_criteria" DROP COLUMN "values",
ADD COLUMN     "value" TEXT NOT NULL;

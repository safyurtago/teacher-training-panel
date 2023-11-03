/*
  Warnings:

  - You are about to alter the column `criteria_score` on the `check_with_task_criterias` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `overall_score` on the `task_apply` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `value` on the `task_criteria` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "check_with_task_criterias" ALTER COLUMN "criteria_score" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "task_apply" ALTER COLUMN "overall_score" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "task_criteria" ALTER COLUMN "value" SET DATA TYPE INTEGER;

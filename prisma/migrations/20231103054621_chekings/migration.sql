/*
  Warnings:

  - You are about to drop the `check_tasl_criterias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_tasl_criterias" DROP CONSTRAINT "check_tasl_criterias_task_applyId_fkey";

-- DropForeignKey
ALTER TABLE "check_tasl_criterias" DROP CONSTRAINT "check_tasl_criterias_task_criteriaId_fkey";

-- DropTable
DROP TABLE "check_tasl_criterias";

-- CreateTable
CREATE TABLE "check_with_task_criterias" (
    "id" TEXT NOT NULL,
    "task_applyId" TEXT NOT NULL,
    "task_criteriaId" TEXT NOT NULL,
    "criteria_score" BIGINT NOT NULL DEFAULT 0,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_with_task_criterias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_with_task_criterias" ADD CONSTRAINT "check_with_task_criterias_task_applyId_fkey" FOREIGN KEY ("task_applyId") REFERENCES "task_apply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_with_task_criterias" ADD CONSTRAINT "check_with_task_criterias_task_criteriaId_fkey" FOREIGN KEY ("task_criteriaId") REFERENCES "task_criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

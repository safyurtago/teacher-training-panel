-- CreateTable
CREATE TABLE "task_apply" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file" TEXT,
    "is_active" BOOLEAN,
    "is_seen" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_apply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_apply" ADD CONSTRAINT "task_apply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_apply" ADD CONSTRAINT "task_apply_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

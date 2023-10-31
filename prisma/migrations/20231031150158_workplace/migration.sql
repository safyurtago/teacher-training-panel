-- CreateTable
CREATE TABLE "teacher_workplace" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_workplace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teacher_workplace" ADD CONSTRAINT "teacher_workplace_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_workplace" ADD CONSTRAINT "teacher_workplace_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

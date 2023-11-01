-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "TeacherPersonalInfo" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "nationality" TEXT,
    "gender" "GenderType",
    "birthDate" TIMESTAMP(3),
    "passport_serial" BIGINT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "photo" TEXT,

    CONSTRAINT "TeacherPersonalInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherPersonalInfo" ADD CONSTRAINT "TeacherPersonalInfo_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The `gender` column on the `TeacherPersonalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TeacherPersonalInfo" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT,
ALTER COLUMN "passport_serial" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "GenderType";

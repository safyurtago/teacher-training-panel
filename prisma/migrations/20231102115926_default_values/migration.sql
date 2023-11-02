-- AlterTable
ALTER TABLE "check_training_apply" ALTER COLUMN "is_active" SET DEFAULT false,
ALTER COLUMN "is_seen" SET DEFAULT false;

-- AlterTable
ALTER TABLE "training_apply" ALTER COLUMN "is_seen" SET DEFAULT false;

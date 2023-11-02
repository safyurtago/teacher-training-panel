-- CreateTable
CREATE TABLE "training" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "subject" TEXT,
    "max_score" INTEGER,
    "pass_score" INTEGER,
    "file" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_apply" (
    "id" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "text" TEXT,
    "file" TEXT,
    "is_seen" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_apply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_training_apply" (
    "id" TEXT NOT NULL,
    "training_applyId" TEXT NOT NULL,
    "description" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN,
    "is_seen" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_training_apply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_apply" ADD CONSTRAINT "training_apply_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_apply" ADD CONSTRAINT "training_apply_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_training_apply" ADD CONSTRAINT "check_training_apply_training_applyId_fkey" FOREIGN KEY ("training_applyId") REFERENCES "training_apply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "test_1" TEXT DEFAULT '',
ADD COLUMN     "test_2" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "test" (
    "id" TEXT NOT NULL,
    "test" TEXT NOT NULL DEFAULT 'test',

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

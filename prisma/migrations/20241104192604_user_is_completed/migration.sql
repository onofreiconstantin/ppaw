-- DropIndex
DROP INDEX "users_cnp_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

/*
  Warnings:

  - You are about to drop the column `test_migrare` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `test_migrare2` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "test_migrare",
DROP COLUMN "test_migrare2";

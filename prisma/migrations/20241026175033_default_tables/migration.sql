/*
  Warnings:

  - You are about to drop the column `test_1` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `test_2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "test_1",
DROP COLUMN "test_2";

-- DropTable
DROP TABLE "test";

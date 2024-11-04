/*
  Warnings:

  - You are about to drop the column `image_path` on the `users` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users"
RENAME COLUMN "image_path" TO "image_url";

ALTER TABLE "users"
ALTER COLUMN "cnp" DROP NOT NULL;

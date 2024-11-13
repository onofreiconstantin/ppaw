/*
  Warnings:

  - The values [CANCELLED] on the enum `TransactionsStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionsStatus_new" AS ENUM ('PAID', 'REFUSED');
ALTER TABLE "transactions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "transactions" ALTER COLUMN "status" TYPE "TransactionsStatus_new" USING ("status"::text::"TransactionsStatus_new");
ALTER TYPE "TransactionsStatus" RENAME TO "TransactionsStatus_old";
ALTER TYPE "TransactionsStatus_new" RENAME TO "TransactionsStatus";
DROP TYPE "TransactionsStatus_old";
ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'PAID';
COMMIT;

/*
  Warnings:

  - The `display` column on the `tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forSale` column on the `tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "display",
ADD COLUMN     "display" BOOLEAN,
DROP COLUMN "forSale",
ADD COLUMN     "forSale" BOOLEAN;

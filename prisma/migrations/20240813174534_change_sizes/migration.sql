/*
  Warnings:

  - Changed the type of `size` on the `InStock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "InStock" DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL;

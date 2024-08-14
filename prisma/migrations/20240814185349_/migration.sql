/*
  Warnings:

  - The `shippingMethod` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('RETIRO', 'CADETE', 'CORREO');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingMethod",
ADD COLUMN     "shippingMethod" "ShippingMethod";

-- DropEnum
DROP TYPE "shippingMethod";

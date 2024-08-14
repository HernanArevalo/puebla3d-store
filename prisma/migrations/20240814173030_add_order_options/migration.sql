/*
  Warnings:

  - The `shippingMethod` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'PRODUCTION', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "shippingMethod" AS ENUM ('RETIRO', 'CADETE', 'ENVIO');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL,
DROP COLUMN "shippingMethod",
ADD COLUMN     "shippingMethod" "shippingMethod";

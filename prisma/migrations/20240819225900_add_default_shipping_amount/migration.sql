/*
  Warnings:

  - You are about to alter the column `shippingAmount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shippingAmount" SET DEFAULT 0,
ALTER COLUMN "shippingAmount" SET DATA TYPE INTEGER;

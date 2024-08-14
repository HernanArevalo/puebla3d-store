/*
  Warnings:

  - The values [ENVIO] on the enum `shippingMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "shippingMethod_new" AS ENUM ('RETIRO', 'CADETE', 'CORREO');
ALTER TABLE "Order" ALTER COLUMN "shippingMethod" TYPE "shippingMethod_new" USING ("shippingMethod"::text::"shippingMethod_new");
ALTER TYPE "shippingMethod" RENAME TO "shippingMethod_old";
ALTER TYPE "shippingMethod_new" RENAME TO "shippingMethod";
DROP TYPE "shippingMethod_old";
COMMIT;

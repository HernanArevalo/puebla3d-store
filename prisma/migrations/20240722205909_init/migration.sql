/*
  Warnings:

  - The values [SMALL,MEDIUM,LARGE,EXTRALARGE,UNIQUE] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('small', 'medium', 'large', 'extralarge', 'unique');
ALTER TABLE "Product" ALTER COLUMN "sizes" DROP DEFAULT;
ALTER TABLE "InStock" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TABLE "Product" ALTER COLUMN "sizes" TYPE "Size_new"[] USING ("sizes"::text::"Size_new"[]);
ALTER TABLE "OrderItem" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
ALTER TABLE "Product" ALTER COLUMN "sizes" SET DEFAULT ARRAY[]::"Size"[];
COMMIT;

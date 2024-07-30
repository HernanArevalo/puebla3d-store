/*
  Warnings:

  - You are about to drop the column `colors` on the `InStock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InStock" DROP COLUMN "colors";

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "inStockId" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_inStockId_fkey" FOREIGN KEY ("inStockId") REFERENCES "InStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

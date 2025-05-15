/*
  Warnings:

  - You are about to drop the column `department` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductFeatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductFeatures" DROP CONSTRAINT "_ProductFeatures_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFeatures" DROP CONSTRAINT "_ProductFeatures_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "department",
ADD COLUMN     "departmentId" TEXT;

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "_ProductFeatures";

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

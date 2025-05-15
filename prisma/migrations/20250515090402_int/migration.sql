/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `boughtInLastMonth` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isBestSeller` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `listPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productURL` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_productId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_productId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- DropIndex
DROP INDEX "Category_category_name_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "category_name",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "boughtInLastMonth",
DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "imgUrl",
DROP COLUMN "isBestSeller",
DROP COLUMN "listPrice",
DROP COLUMN "price",
DROP COLUMN "productURL",
DROP COLUMN "reviewCount",
DROP COLUMN "stars",
DROP COLUMN "updatedAt",
ADD COLUMN     "amazon_choice" BOOLEAN,
ADD COLUMN     "answered_questions" INTEGER,
ADD COLUMN     "availability" BOOLEAN NOT NULL,
ADD COLUMN     "badge" TEXT,
ADD COLUMN     "bought_past_month" BOOLEAN,
ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "bs_category" TEXT,
ADD COLUMN     "bs_rank" INTEGER,
ADD COLUMN     "buybox_prices" TEXT,
ADD COLUMN     "buybox_seller" TEXT,
ADD COLUMN     "country_of_origin" TEXT,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "date_first_available" TIMESTAMP(3),
ADD COLUMN     "delivery" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "discount" TEXT,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "final_price" DOUBLE PRECISION,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "images" TEXT,
ADD COLUMN     "images_count" INTEGER,
ADD COLUMN     "ingredients" TEXT,
ADD COLUMN     "initial_price" DOUBLE PRECISION,
ADD COLUMN     "input_asin" TEXT,
ADD COLUMN     "is_available" BOOLEAN,
ADD COLUMN     "item_weight" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "model_number" TEXT,
ADD COLUMN     "number_of_sellers" INTEGER,
ADD COLUMN     "origin_url" TEXT,
ADD COLUMN     "parent_asin" TEXT,
ADD COLUMN     "plus_content" TEXT,
ADD COLUMN     "prices_breakdown" TEXT,
ADD COLUMN     "product_details" TEXT,
ADD COLUMN     "product_dimensions" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviews_count" INTEGER,
ADD COLUMN     "root_bs_category" TEXT,
ADD COLUMN     "root_bs_rank" INTEGER,
ADD COLUMN     "seller_id" TEXT,
ADD COLUMN     "seller_name" TEXT NOT NULL,
ADD COLUMN     "subcategory_rank" INTEGER,
ADD COLUMN     "timestamp" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "top_review" TEXT,
ADD COLUMN     "upc" TEXT,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "variations" JSONB,
ADD COLUMN     "video" TEXT,
ADD COLUMN     "video_count" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Wishlist";

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "region" TEXT,
    "currency" TEXT,
    "language" TEXT,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaveForLater" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "SaveForLater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductFeatures" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_productId_key" ON "Favorite"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "SaveForLater_userId_productId_key" ON "SaveForLater"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategories_AB_unique" ON "_ProductCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategories_B_index" ON "_ProductCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductFeatures_AB_unique" ON "_ProductFeatures"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductFeatures_B_index" ON "_ProductFeatures"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_asin_idx" ON "Product"("asin");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveForLater" ADD CONSTRAINT "SaveForLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveForLater" ADD CONSTRAINT "SaveForLater_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductFeatures" ADD CONSTRAINT "_ProductFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductFeatures" ADD CONSTRAINT "_ProductFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

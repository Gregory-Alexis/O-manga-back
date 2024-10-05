/*
  Warnings:

  - Added the required column `updated_at` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Universe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FavoriteCategory_user_id_category_id_key";

-- DropIndex
DROP INDEX "FavoriteUniverse_user_id_universe_id_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Universe" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

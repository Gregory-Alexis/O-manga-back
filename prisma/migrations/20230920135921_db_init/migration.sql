-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(500),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "city" VARCHAR(255),
    "zip_code" VARCHAR(15),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR(500) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL CHECK ("rating" >= 0 AND "rating" <= 5),
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL CHECK ("stock" >= 0),
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL CHECK ("price" >= 0),
    "category_id" INTEGER NOT NULL,
    "universe_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archeving_date" TIMESTAMP(3) NOT NULL,
    "product_quantity" INTEGER NOT NULL CHECK ("product_quantity" >= 0),
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Universe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Universe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteCategory" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "FavoriteCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteUniverse" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "universe_id" INTEGER NOT NULL,

    CONSTRAINT "FavoriteUniverse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_id_universe_id_key" ON "Product"("category_id", "universe_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_user_id_product_id_key" ON "Order"("user_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteCategory_user_id_category_id_key" ON "FavoriteCategory"("user_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteUniverse_user_id_universe_id_key" ON "FavoriteUniverse"("user_id", "universe_id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_universe_id_fkey" FOREIGN KEY ("universe_id") REFERENCES "Universe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCategory" ADD CONSTRAINT "FavoriteCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCategory" ADD CONSTRAINT "FavoriteCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteUniverse" ADD CONSTRAINT "FavoriteUniverse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteUniverse" ADD CONSTRAINT "FavoriteUniverse_universe_id_fkey" FOREIGN KEY ("universe_id") REFERENCES "Universe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

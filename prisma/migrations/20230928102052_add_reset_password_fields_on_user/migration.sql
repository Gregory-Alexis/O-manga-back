/*
  Warnings:

  - A unique constraint covering the columns `[resetPassword]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resetPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPassword" TEXT NOT NULL,
ADD COLUMN     "resetPasswordExpires" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetPassword_key" ON "User"("resetPassword");

/*
  Warnings:

  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."contact";

-- CreateTable
CREATE TABLE "public"."testcontact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testcontact_pkey" PRIMARY KEY ("id")
);

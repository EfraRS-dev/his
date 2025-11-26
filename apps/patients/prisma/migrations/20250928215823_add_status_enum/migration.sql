/*
  Warnings:

  - Changed the type of `status` on the `Patient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('active', 'archived');

-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "status",
ADD COLUMN     "status" "public"."Status" NOT NULL;

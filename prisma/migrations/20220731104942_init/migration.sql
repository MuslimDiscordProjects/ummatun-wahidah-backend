/*
  Warnings:

  - You are about to drop the column `relativePath` on the `document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "document" DROP COLUMN "relativePath",
ADD COLUMN     "filetype" TEXT NOT NULL DEFAULT 'pdf';

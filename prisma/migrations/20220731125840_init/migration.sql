/*
  Warnings:

  - You are about to drop the column `files` on the `resource` table. All the data in the column will be lost.
  - Added the required column `file` to the `resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resource" DROP COLUMN "files",
ADD COLUMN     "file" TEXT NOT NULL;

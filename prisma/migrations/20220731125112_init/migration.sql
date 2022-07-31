/*
  Warnings:

  - You are about to drop the column `content` on the `project` table. All the data in the column will be lost.
  - Added the required column `description` to the `resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "content",
ADD COLUMN     "files" TEXT[],
ADD COLUMN     "resources" TEXT[];

-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "description" TEXT NOT NULL;

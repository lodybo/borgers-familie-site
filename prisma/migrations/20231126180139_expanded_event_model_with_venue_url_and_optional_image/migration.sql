/*
  Warnings:

  - Added the required column `venueUrl` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "venueUrl" TEXT NOT NULL,
ALTER COLUMN "imagePath" DROP NOT NULL;

/*
  Warnings:

  - Added the required column `emailAddress` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "emailAddress" TEXT NOT NULL default 'hi@lodybo.nl';

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "emailAddress" TEXT NOT NULL default 'hi@lodybo.nl';

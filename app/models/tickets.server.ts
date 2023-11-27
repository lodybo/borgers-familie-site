import crypto from "crypto";

import { prisma } from "~/db.server";

export function generateTicketNumber() {
  return crypto.getRandomValues(new Uint8Array(3)).join("");
}

export function generateMultipleTicketNumbers(count: number) {
  return Array.from({ length: count }, generateTicketNumber);
}

export function getTicketByTicketNumber(ticketNumber: string) {
  return prisma.ticket.findUniqueOrThrow({
    where: {
      ticketNumber: parseInt(ticketNumber, 10),
    },
  });
}

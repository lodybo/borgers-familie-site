import crypto from "crypto";

import { Ticket } from "@prisma/client";

import { prisma } from "~/db.server";

export function generateTicketNumber() {
  return crypto.getRandomValues(new Uint8Array(3)).join("");
}

export function generateMultipleTicketNumbers(count: number) {
  return Array.from({ length: count }, generateTicketNumber);
}

export function createTicket({
  ticketNumber,
  eventSlug,
  paymentId,
}: {
  ticketNumber: string;
  eventSlug: string;
  paymentId: string;
}): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      ticketNumber: parseInt(ticketNumber, 10),
      event: {
        connect: {
          slug: eventSlug,
        },
      },
      payment: {
        connect: {
          id: paymentId,
        },
      },
    },
  });
}

export function getTicketByTicketNumber(ticketNumber: string) {
  return prisma.ticket.findUniqueOrThrow({
    where: {
      ticketNumber: parseInt(ticketNumber, 10),
    },
    include: {
      payment: true,
    },
  });
}

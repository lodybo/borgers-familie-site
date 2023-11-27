import { SerializeFrom } from "@remix-run/node";
import sgMail from "@sendgrid/mail";

import { getEventById } from "~/models/events.server";
import { getPaymentFromDb } from "~/models/payments.server";
import { getTicketByTicketNumber } from "~/models/tickets.server";
import { formatDate, formatTime, formatToEuro } from "~/utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export type TicketConfirmationPayload = {
  event: {
    name: string;
    description: string;
    date: string;
    doorsOpen: string;
    venue: string;
    venueAddress: string;
    venueUrl: string;
  };
  payment: {
    paymentId: string;
    molliePaymentId: string;
    noOfTickets: number;
    totalPrice: string;
    ticketUrl: string;
  };
};

const from = {
  name: "De familie Borgers",
  email: "hi@lodybo.nl",
};

export async function sendTicketConfirmation({
  ticket,
  event,
  payment,
}: {
  ticket: Awaited<ReturnType<typeof getTicketByTicketNumber>>;
  event: Awaited<ReturnType<typeof getEventById>>;
  payment: Awaited<ReturnType<typeof getPaymentFromDb>>;
}) {
  const dynamicPayload: TicketConfirmationPayload = {
    event: {
      name: event.name,
      description: event.description,
      date: formatDate(event.date.toISOString()),
      doorsOpen: formatTime(event.doorsOpen.toISOString()),
      venue: event.venue,
      venueAddress: event.venueAddress,
      venueUrl: event.venueUrl,
    },
    payment: {
      paymentId: payment.id,
      molliePaymentId: payment.molliePaymentId,
      noOfTickets: payment._count.tickets,
      totalPrice: formatToEuro(payment.amount.toString()),
      ticketUrl: `${process.env.APP_BASE_URL}/tickets/${payment.id}`,
    },
  };

  return sgMail.send({
    from,
    to: ticket.emailAddress,
    dynamicTemplateData: dynamicPayload,
    templateId: "d-b1119c500a6848708571c2abacf0e7c2",
  });
}

import { json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { getEventById } from "~/models/events.server";
import { getPaymentFromDbWithTickets } from "~/models/payments.server";
import { useLoaderData } from "@remix-run/react";
import { formatToEuro } from "~/utils";
import QRCode from "react-qr-code";

export async function loader({ params }: LoaderFunctionArgs) {
  const { paymentId } = params;

  if (!paymentId) {
    return json({ error: "No payment ID provided" }, { status: 400 });
  }

  invariant(paymentId, "No payment ID provided");

  const payment = await getPaymentFromDbWithTickets(paymentId);
  const tickets = payment.tickets;
  const eventId = tickets[0].eventId;
  const event = await getEventById(eventId);

  return json({
    payment,
    tickets,
    event,
  });
}

export default function TicketPage() {
  const loaderData = useLoaderData<typeof loader>();

  if ("error" in loaderData) {
    return (
      <div className="p-8">
        <h1 className="text-4xl mb-10 font-plakat">Ticket niet gevonden</h1>
      </div>
    );
  }

  const { payment, tickets, event } = loaderData;

  return (
    <div className="p-8 space-y-6">
      <div className="bg-light-blue text-grey p-8">
        <h1 className="text-4xl mb-10 font-plakat">{event.name}</h1>
      </div>

      <p>{event.description}</p>

      <ul className="text-base list-disc list-inside">
        <li>
          {tickets.length} {tickets.length > 1 ? "tickets" : "ticket"}
        </li>
        <li>{formatToEuro(payment.amount)}</li>
        <li>Transactie ID: {payment.molliePaymentId}</li>
      </ul>

      <h2 className="text-2xl font-plakat">Tickets</h2>
      <ul className="grid grid-cols-2 gap-20">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="space-y-2">
            <QRCode value={ticket.ticketNumber.toString()} />
            <p className="text-base">Ticketnummer: {ticket.ticketNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const handle = {
  bg: "bg-white text-black",
};

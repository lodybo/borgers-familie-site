import { PaymentStatus } from "@mollie/api-client";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { sendTicketConfirmation } from "~/mail.server";
import { getEventById } from "~/models/events.server";
import {
  getPayment,
  getPaymentFromDb,
  updatePaymentStatus,
} from "~/models/payments.server";
import { getTicketByTicketNumber } from "~/models/tickets.server";
import { getErrorMessage } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const ticketNumber = url.searchParams.get("ticketNumber");

  try {
    if (ticketNumber) {
      const ticket = await getTicketByTicketNumber(ticketNumber);
      const payment = await getPaymentFromDb(ticket.paymentId);
      const event = await getEventById(ticket.eventId);

      const molliePayment = await getPayment(payment.molliePaymentId);
      await updatePaymentStatus(payment.id, molliePayment.status);

      switch (molliePayment.status) {
        case PaymentStatus.open:
          return redirect("/betaling/mislukt", { status: 303 });
        case PaymentStatus.canceled:
          return redirect("/betaling/geannuleerd", { status: 303 });
        case PaymentStatus.paid:
          await sendTicketConfirmation({ ticket, event, payment });
          return redirect("/betaling/gelukt", { status: 303 });
      }
      console.warn(
        `Unknown payment status of ${payment.status} reached for ticket ${ticketNumber}`,
      );
      return redirect("/betaling/mislukt", { status: 303 });
    } else {
      return redirect("/betaling/mislukt", { status: 303 });
    }
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export default function PaymentProcessing() {
  return (
    <div className="p-8">
      <h1 className="text-4xl mb-10">Betaling wordt verwerkt...</h1>
    </div>
  );
}

import { PaymentStatus } from "@mollie/api-client";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { getPayment, updatePaymentStatus } from "~/models/payments.server";
import { getTicketByTicketNumber } from "~/models/tickets.server";
import { getErrorMessage } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const ticketNumber = url.searchParams.get("ticketNumber");

  try {
    if (ticketNumber) {
      const ticket = await getTicketByTicketNumber(ticketNumber);
      const payment = await getPayment(ticket.payment.molliePaymentId);
      await updatePaymentStatus(ticket.payment.id, payment.status);

      switch (payment.status) {
        case PaymentStatus.failed:
          return redirect("/betaling/mislukt", { status: 303 });
        case PaymentStatus.canceled:
          return redirect("/betaling/geannuleerd", { status: 303 });
        case PaymentStatus.paid:
          return redirect("/betaling/gelukt", { status: 303 });
      }
      console.warn(
        `Unknown payment status of ${payment.status} reached for ticket ${ticketNumber}`,
      );
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

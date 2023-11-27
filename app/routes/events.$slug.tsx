import {
  ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import EventDetails from "~/components/EventDetails";
import TicketForm from "~/components/TicketForm";
import { getEventBySlug } from "~/models/events.server";
import { createPayment, getiDEALIssuers } from "~/models/payments.server";
import { createTicket, createTicketNumber } from "~/models/tickets.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    return redirect("/events");
  }

  try {
    const event = await getEventBySlug(slug);
    const iDealIssuers = await getiDEALIssuers();

    return json({ event, issuers: iDealIssuers.issuers });
  } catch (error) {
    throw new Error("Not found");
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    return redirect("/events");
  }

  const data = await request.formData();

  const issuer = data.get("issuer") as string;
  const email = data.get("email") as string;
  const amount = data.get("amount") as string;

  const ticketNumber = createTicketNumber();
  const [dbPayment, molliePayment] = await createPayment({
    issuer,
    email,
    amount,
    ticketNumber,
  });
  await createTicket({
    ticketNumber,
    paymentId: dbPayment.id,
    eventSlug: slug,
  });

  const checkoutUrl = molliePayment.getCheckoutUrl();

  if (checkoutUrl) {
    return redirect(checkoutUrl, { status: 303 });
  }

  return json(
    { message: "No checkout URL found", molliePayment },
    { status: 500 },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.event.name || "Borgers Familie" },
];

export default function Event() {
  const { event, issuers } = useLoaderData<typeof loader>();

  return (
    <div className="w-full md:w-[50vw] mx-auto px-4 space-y-4">
      <EventDetails event={event} />

      <TicketForm issuers={issuers} price={event.price} />
    </div>
  );
}
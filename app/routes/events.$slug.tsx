import {
  ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import EventDetails from "~/components/EventDetails";
import TicketForm from "~/components/TicketForm";
import { csrf } from "~/csrf.server";
import { getEventBySlug } from "~/models/events.server";
import { createPayment, getiDEALIssuers } from "~/models/payments.server";
import { validateEmail } from "~/utils";

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

  return json(
    {
      errors: {
        form: "Dit is tijdelijk niet mogelijk. Maar je kan altijd tickets kopen via de <a class='border-b border-b-grey font-bold pb-0 hover:pb-0.5 hover:border-b-light-blue transition-all duration-200 ease-in-out' href='https://www.bluecollarhotel.com/events/'>website van het Blue Collar Hotel.</a>",
      },
    },
    { status: 400 },
  );

  // if (!slug) {
  //   return redirect("/events");
  // }
  //
  // const data = await request.formData();
  // const event = await getEventBySlug(slug);
  //
  // try {
  //   await csrf.validate(data, request.headers);
  // } catch (error) {
  //   console.error("Invalid request", error);
  //   return json({ errors: { form: "Invalid request" } }, { status: 400 });
  // }
  //
  // const issuer = data.get("issuer");
  // const email = data.get("email");
  // const amount = data.get("amount");
  //
  // const errors: Record<string, string> = {};
  //
  // if (!issuer) {
  //   errors.issuer = "Geen bank gekozen";
  // }
  //
  // if (!email) {
  //   errors.email = "Geen e-mailadres ingevuld";
  // }
  //
  // if (!validateEmail(email)) {
  //   errors.email = "Ongeldig e-mailadres";
  // }
  //
  // if (!amount || amount === "0") {
  //   errors.amount = "Geen bedrag ingevuld";
  // }
  //
  // if (Object.keys(errors).length > 0) {
  //   return json({ errors }, { status: 400 });
  // }
  //
  // invariant(typeof issuer === "string", "issuer is required");
  // invariant(typeof email === "string", "email is required");
  // invariant(typeof amount === "string", "amount is required");
  //
  // const payment = await createPayment({
  //   issuer,
  //   email,
  //   event,
  //   noOfTickets: amount,
  // });
  //
  // const checkoutUrl = payment.getCheckoutUrl();
  //
  // if (checkoutUrl) {
  //   return redirect(checkoutUrl, { status: 303 });
  // }
  //
  // return json({ message: "No checkout URL found", payment }, { status: 500 });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.event.name || "Borgers Familie" },
];

export default function Event() {
  const { event, issuers } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const errors =
    actionData && "errors" in actionData ? actionData.errors : undefined;

  if (errors?.form) {
    console.error(errors.form);
  }

  return (
    <div className="w-full lg:w-[50vw] mx-auto space-y-4">
      <EventDetails event={event} />

      <TicketForm issuers={issuers} price={event.price} errors={errors} />
    </div>
  );
}

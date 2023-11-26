import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AnchorLink from "~/components/AnchorLink";
import Image from "~/components/Image";
import { getEvents } from "~/models/events.server";

export async function loader() {
  const events = await getEvents();

  return json({ events });
}

export default function TicketLayout() {
  const { events } = useLoaderData<typeof loader>();

  const formatDateAsMonthDay = (
    isoString: string,
  ): [day: string, month: string] => {
    const date = new Date(isoString);

    return [
      date.toLocaleDateString("nl-NL", {
        day: "2-digit",
      }),
      date.toLocaleDateString("nl-NL", {
        month: "short",
      }),
    ];
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    return date.toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);

    return date.toLocaleTimeString("nl-NL", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatToEuro = (amount: string) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(amount));
  };

  return (
    <ul>
      {events.map((event) => (
        <li className="flex flex-row gap-8" key={event.id}>
          <div className="flex flex-col items-center">
            <p className="text-4xl text-light-blue font-plakat">
              {formatDateAsMonthDay(event.date)[0]}
            </p>

            <p className="text-2xl text-grey font-plakat">
              {formatDateAsMonthDay(event.date)[1]}
            </p>
          </div>
          <div className="space-y-3">
            <h2>
              <AnchorLink to={`/tickets/${event.slug}`}>
                {event.name}
              </AnchorLink>
            </h2>

            <ul className="text-sm grid [grid-template-areas:_'starting-time_doors-open_price'_'venue_address_.'] gap-1">
              <li className="[grid-area:_starting-time]">
                <span className="text-light-blue">Aanvangstijd</span>{" "}
                {formatDate(event.date)}
              </li>
              <li className="[grid-area:_doors-open]">
                <span className="text-light-blue">Deuren open</span>{" "}
                {formatTime(event.doorsOpen)}
              </li>
              <li className="[grid-area:_price]">
                <span className="text-light-blue">Prijs</span>{" "}
                {formatToEuro(event.price)}
              </li>
              <li className="[grid-area:_venue]">
                <span className="text-light-blue">Locatie</span>{" "}
                <AnchorLink subtle to={event.venueUrl}>
                  {event.venue}
                </AnchorLink>
              </li>
              <li className="[grid-area:_address]">
                <span className="text-light-blue">Adres</span>{" "}
                <AnchorLink
                  subtle
                  to={`https://maps.google.com/?q=${event.venueAddress}`}
                >
                  {event.venueAddress}
                </AnchorLink>
              </li>
            </ul>

            <p className="text-base">{event.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

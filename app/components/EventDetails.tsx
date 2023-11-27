import { SerializeFrom } from "@remix-run/node";

import AnchorLink from "~/components/AnchorLink";
import Image from "~/components/Image";
import { Event } from "~/models/events.server";
import { constructGoogleMapsUrl, formatDate, formatTime } from "~/utils";

type Props = {
  event: SerializeFrom<Event>;
};

export default function EventDetails({ event }: Props) {
  return (
    <>
      {event.imagePath ? (
        <div className="aspect-auto w-full h-96 object-center object-cover">
          <Image src={event.imagePath} alt={event.name} />
        </div>
      ) : null}
      <h1 className="text-4xl font-plakat">{event.name}</h1>
      <p>{event.description}</p>

      <ul className="text-xl">
        <li>
          <span className="text-light-blue font-plakat">Locatie</span>:{" "}
          <AnchorLink
            to={constructGoogleMapsUrl(event.venue, event.venueAddress)}
            subtle
          >
            {event.venue}
          </AnchorLink>
        </li>
        <li>
          <span className="text-light-blue font-plakat">Adres</span>:{" "}
          {event.venueAddress}
        </li>
        <li>
          <span className="text-light-blue font-plakat">Datum</span>:{" "}
          {formatDate(event.date)}
        </li>
        <li>
          <span className="text-light-blue font-plakat">Deuren open</span>:{" "}
          {formatTime(event.doorsOpen)}
        </li>
      </ul>
    </>
  );
}

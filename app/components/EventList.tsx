import { SerializeFrom } from "@remix-run/node";

import AnchorLink from "~/components/AnchorLink";
import { EventMeta } from "~/components/EventMeta";
import { Event } from "~/models/events.server";
import { formatDateAsDayMonth } from "~/utils";

type EventWithoutDates = SerializeFrom<Omit<Event, "createdAt" | "updatedAt">>;

type Props = {
  events: EventWithoutDates[];
};

export default function EventList({ events }: Props) {
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

type EventItemProps = {
  event: EventWithoutDates;
};

function EventItem({ event }: EventItemProps) {
  const [day, month] = formatDateAsDayMonth(event.date);

  return (
    <li className="flex flex-col md:flex-row gap-8" key={event.id}>
      <div className="flex flex-col items-center">
        <p className="text-4xl text-light-blue font-plakat">{day}</p>

        <p className="text-2xl text-grey font-plakat">{month}</p>
      </div>
      <div className="space-y-3">
        <h2>
          <AnchorLink to={`/events/${event.slug}`}>{event.name}</AnchorLink>
        </h2>

        <EventMeta
          startTime={event.date}
          doorsOpen={event.doorsOpen}
          price={event.price}
          venue={event.venue}
          venueAddress={event.venueAddress}
          venueUrl={event.venueUrl}
        />

        <p className="text-base">{event.description}</p>
      </div>
    </li>
  );
}

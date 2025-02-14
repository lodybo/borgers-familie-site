import { type SerializeFrom } from "@remix-run/node";

import { EventMeta } from "~/components/EventMeta";
import { type Event } from "~/models/events.server";

export type EventWithIgnoreOption = Event & { ignoreStartTime?: string };

type Props = {
  events: SerializeFrom<EventWithIgnoreOption[]>;
};

export default function EventsSummary({ events }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-4xl">Aankomende shows</h2>
      {events.length === 0 ? (
        <p className="text-sm">
          Er zijn geen aankomende shows. Houd de website goed in de gaten om te
          weten wanneer we weer in de buurt spelen!
        </p>
      ) : (
        <ul>
          {events.map((event) => (
            <li className="flex flex-col md:flex-row gap-8" key={event.id}>
              <div className="space-y-3">
                <h3>{event.name}</h3>

                <EventMeta
                  startTime={event.date.toString()}
                  doorsOpen={event.doorsOpen.toString()}
                  price={event.price}
                  venue={event.venue}
                  venueAddress={event.venueAddress}
                  venueUrl={event.venueUrl}
                  ignoreStartTime={event.ignoreStartTime}
                />

                <p className="text-base">{event.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

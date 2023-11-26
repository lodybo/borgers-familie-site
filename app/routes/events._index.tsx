import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import EventList from "~/components/EventList";
import { getEvents } from "~/models/events.server";

export async function loader() {
  const events = await getEvents();

  return json({ events });
}

export default function EventIndex() {
  const { events } = useLoaderData<typeof loader>();

  return <EventList events={events} />;
}

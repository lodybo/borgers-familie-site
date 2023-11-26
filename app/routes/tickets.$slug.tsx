import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AnchorLink from "~/components/AnchorLink";
import { getEventBySlug } from "~/models/events.server";
import { constructGoogleMapsUrl, formatDate, formatTime } from "~/utils";
import Image from "~/components/Image";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    return redirect("/tickets");
  }

  try {
    const event = await getEventBySlug(slug);

    return json({ event });
  } catch (error) {
    throw new Error("Not found");
  }
}

export default function Event() {
  const { event } = useLoaderData<typeof loader>();

  return (
    <div className="w-full md:w-[50vw] mx-auto px-4 space-y-4">
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
    </div>
  );
}

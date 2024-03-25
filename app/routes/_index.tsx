import { json, type MetaFunction, SerializeFrom } from "@remix-run/node";
import { type useLoaderData } from "@remix-run/react";

import events from "~/assets/events.json";
import BookPromoContent from "~/components/BookPromoContent";
import EventsSummary, {
  EventWithIgnoreOption,
} from "~/components/EventsSummary";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import IntroductionContent from "~/components/IntroductionContent";
import LiveAlbumPromoContent from "~/components/LiveAlbumPromoContent";
import RosterContent from "~/components/RosterContent";
import SinglePromoContent from "~/components/SinglePromoContent";

export const meta: MetaFunction = () => [
  { title: "Borgers Familieband" },
  {
    name: "description",
    content:
      "Ieder jaar nodigt Bertus een aantal van zijn familieleden uit op het podium voor een avond vol rock, soul & blues. Het oude jaar is voorbij, het nieuwe jaar staat alweer in de startblokken en Bertus en zijn familie komen samen muziek maken om het jaar swingend af te trappen!",
  },
  {
    name: "keywords",
    content:
      "Bertus, Borgers, familie, band, rock, soul, blues, Eindhoven, Eindhoven Rockcity",
  },
];

export async function loader() {
  return json<SerializeFrom<EventWithIgnoreOption[]>>(events);
}

export default function Index() {
  const events = useLoaderData<typeof loader>();

  return (
    <>
      <Hero scrollAnchorID="main-content" />

      <main id="main-content" className="space-y-10 content">
        <EventsSummary events={events} />

        <IntroductionContent />

        <BookPromoContent />

        <SinglePromoContent />
        <LiveAlbumPromoContent />

        <RosterContent />
      </main>

      <Footer showImage />
    </>
  );
}

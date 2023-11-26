import { type MetaFunction } from "@remix-run/node";

import BookPromoContent from "~/components/BookPromoContent";
import Footer from "~/components/Footer";
import IntroductionContent from "~/components/IntroductionContent";
import LiveAlbumPromoContent from "~/components/LiveAlbumPromoContent";
import RosterContent from "~/components/RosterContent";
import SinglePromoContent from "~/components/SInglePromoContent";
import Hero from "~/components/Hero";

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

export default function Index() {
  return (
    <>
      <Hero />

      <div className="space-y-10 content">
        <IntroductionContent />

        <BookPromoContent />

        <SinglePromoContent />
        <LiveAlbumPromoContent />

        <RosterContent />
      </div>

      <Footer />
    </>
  );
}

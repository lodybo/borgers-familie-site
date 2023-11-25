import { type MetaFunction } from "@remix-run/node";

import IntroductionContent from "~/components/IntroductionContent";

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
      <IntroductionContent />
    </>
  );
}

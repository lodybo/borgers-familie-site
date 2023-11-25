import AnchorLink from "~/components/AnchorLink";

export default function IntroductionContent() {
  return (
    <div className="space-y-6">
      <p>
        Muzikant{" "}
        <AnchorLink to="https://bertusborgers.nl/" rel="noopener noreferrer">
          Bertus Borgers
        </AnchorLink>{" "}
        produceerde het boek BORGERS - muziek in de familie, een boek vol
        verhalen over de rol die muziek speelde en en nog steeds speelt in deze
        Brabantse familie.
      </p>

      <details className="text-xl space-y-6">
        <summary className="border border-grey py-2.5 px-4 transition cursor-pointer text-2xl w-48 bg-black text-grey hover:bg-grey hover:text-black details-open:bg-grey details-open:text-black">
          Lees meer...
        </summary>

        <p>
          In het boek BORGERS - muziek in de familie vertelt Bertus Borgers hoe
          muziek in zijn familie steeds zorgde voor samenhang en veerkracht. Het
          eerste verhaal speelt in september 1944 bij de bevrijding van De
          Kempen, de streek waar de familie vandaan komt. Het laatste gaat over
          de uitverkochte rock, soul en blues show die de Borgers familie gaf op
          5 januari 2019 in Blue Collar Hotel op Strijp-S, Eindhoven.
        </p>
        <p>
          Het boek komt in een mooie uitgave van Lecturis / Dato en is rijk
          geïllustreerd met foto’s uit heden en verleden, geschoten door bekende
          fotografen. En dat alles aangevuld met beeld uit het familie archief.
          Een belangrijk aandeel komt van Koos Breukel die samen met zijn vriend
          Sander Troelstra de familie vaak portretteerde en hun optredens
          vastlegden. Maar ook van de vorige generatie, ooms en tantes en de
          ouders van Bertus, zijn mooie afbeeldingen gemaakt onder andere door
          Martien Coppens die de muzikanten van toen in prachtig zwart/wit
          vastlegde.
        </p>
        <p>
          Het bijzondere van dit boek is de toevoeging van Augmented Reality.
          Hierdoor krijgt het papier een verbinding met de digitale wereld, een
          foto kan met een smartphone of tablet verbonden worden met muziek,
          video of andere verdiepende informatie. De techniek hiervoor wordt
          verzorgd door Dutch Rose Media en de beleving van Augmented Reality is
          mogelijk gemaakt door de Effenaar Eindhoven.
        </p>
      </details>
    </div>
  );
}

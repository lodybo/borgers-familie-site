import AnchorLink from "~/components/AnchorLink";
import Image from "~/components/Image";
import SignedCopyInfo from "~/components/SignedCopyInfo";

export default function BookPromoContent() {
  return (
    <>
      <div className="text-lg space-y-6">
        <div className="space-y-6">
          <p>
            Bertus Borgers (Vessem, 1947) schreef het verhaal van het muziek
            maken in zijn familie, vanaf september 1944 toen de Brabantse Kempen
            werd bevrijd, tot en met de rock, soul en blues show die de familie
            afgelopen januari speelde op Strijp-S in Eindhoven.
          </p>

          <p>
            Fotograaf Koos Breukel volgt samen met zijn collega Sander Troelstra
            de familie al jaren. Hij stelde de beelden samen die het verhaal een
            gezicht geven en putte behalve uit eigen werk ook uit het archief
            van familie Borgers.
          </p>

          <p>
            Een aantal van die afbeeldingen zijn met een smartphone of tablet
            tot leven te brengen omdat zij d.m.v. Augmented Reality gekoppeld
            zijn aan een productie op internet. Eén daarvan is de cover van het
            boek, tevens de voorkant van deze flyer.
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <Image
            className="w-full md:w-1/2"
            src="borgers-book-cover.jpg"
            alt="Cover van het BORGERS boek"
          />

          <div className="text-base italic mt-8 pl-0 md:pl-5 space-y-4">
            <p>
              Beleef de toepassing van Augmented Reality en breng de cover van
              het boek tot leven!
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>
                Download de app Effenaar Experiences (
                <AnchorLink
                  className="dark-background"
                  to="https://apps.apple.com/nl/app/effenaar-experiences/id1271719432"
                >
                  iOS
                </AnchorLink>
                ,{" "}
                <AnchorLink
                  className="dark-background"
                  to="https://play.google.com/store/apps/details?id=com.dutchrosemedia.effenaarexperiences&hl=en"
                >
                  Android
                </AnchorLink>
                ) op een smartphone of tablet
              </li>
              <li>scroll in menu NEW naar BORGERS - muziek in de familie </li>
              <li>tik onderaan op DOWNLOAD</li>
              <li>vervolgens op START EXPERIENCE</li>
              <li>Richt je camera op de afbeelding en de cover gaat leven!</li>
            </ul>
          </div>
        </div>
      </div>

      <SignedCopyInfo />
    </>
  );
}

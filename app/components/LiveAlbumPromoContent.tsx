import AnchorLink from "~/components/AnchorLink";
import Image from "~/components/Image";

export default function LiveAlbumPromoContent() {
  return (
    <div className="space-y-10 text-xl">
      <div className="text-center space-y-1">
        <h2 className="font-plakat text-2xl lg:text-[2.3rem]">Borgers</h2>
        <h3 className="font-plakat text-xl lg:text-3xl">
          Family Life @ Blue Collar
        </h3>
      </div>

      <p>
        De presentatie van dit boek werd omlijst met een optreden van een
        uitgebreide band bestaande uit leden van de familie Borgers. Bertus
        haalde behalve zijn broer Ruud en zijn dochter Nova ook de zussen Renie,
        Christien en Marie-José het podium op, samen met Lody, de zoon van de
        overleden journalist/muzikant Peer Borgers. Zij werden in hun rock, soul
        en blues repertoire begeleid op bas en drums door de neefjes Maurice en
        Wouter, de ritmesectie van The Young Retro’s. Begin januari 2020 werd in
        deze bezetting het album Family Life @ Blue Collar opgenomen.
      </p>

      <Image src="cd-wallet-family-life.jpg" alt="CD wallet Family Life" />

      <p>Recorded 4 & 5 januari 2020, Blue Collar Hotel, Strijp-S, Eindhoven</p>

      <div>
        <h4 className="font-plakat text-xl lg:text-2xl">Tracklist</h4>
        <ol className="list-decimal list-inside">
          <li>
            Wat Doe Jij Met Je Leven - <em>ft Bertus</em> - 6’04’’
          </li>
          <li>
            We Were Young - <em>ft Ruud</em> - 4’28’’
          </li>
          <li>
            Back To Black - <em>ft Flen</em> - 4’05’’
          </li>
          <li>
            Dr. Feelgood - <em>ft Christine</em> - 6’12’’
          </li>
          <li>
            Leegte - <em>ft Ruud</em> - 3’53’’
          </li>
          <li>
            That’s Life - <em>ft Bertus</em> - 3’46’’
          </li>
          <li>
            Mayday - <em>ft Nova</em> - 3’52’’
          </li>
          <li>
            Limit To Your Love - <em>ft Ruud</em> - 6’27’’
          </li>
          <li>
            Bread - <em>ft Bertus</em> - 7’20’’
          </li>
          <li>
            Never Be Clever - <em>ft Nova</em> - 2’44’’
          </li>
          <li>
            Fire - <em>ft Ruud</em> - 3’03’’
          </li>
          <li>
            Waaraan - <em>ft Bertus</em> - 6’17’’
          </li>
          <li>
            Still Believe - <em>ft Bertus</em> - 7’10’’
          </li>
        </ol>
      </div>

      <div>
        <h4 className="font-plakat text-xl lg:text-2xl">Line-up</h4>
        <p>
          Bertus sax/voc, Ruud git/voc, Lody git, Maurice bas, Bertho dr, Nova
          voc, Christine voc, Flen voc, Marie-José voc.
        </p>
      </div>

      <div>
        <h4 className="font-plakat text-xl lg:text-2xl">Realising</h4>
        <p>
          Multitracking Toon de Quant, mixing Mr 4 Producers @ Bosrand, artwork
          Katrien van de Camp
        </p>
      </div>

      <div className="text-center font-plakat space-y-6 mt-12 mb-4">
        <h3 className="text-xl lg:text-3xl">
          Met deze{" "}
          <AnchorLink
            className="dark-background"
            to="https://bogey-music.lnk.to/9mRejOCVEM"
            target="_blank"
          >
            link
          </AnchorLink>{" "}
          vind je alle platforms waar je het album kunt streamen en downloaden
        </h3>
        <h4 className="text-xl lg:text-2xl">
          Wilt u een hard-copy CD-tje, koop ‘m op &nbsp;
          <AnchorLink
            className="dark-background"
            to="https://www.bol.com/nl/p/borgers-family-life-blue-collar/9300000000539049/?bltgh=h0UGMz3mA6HtJXfjcUtDHg.1_4.5.ProductTitle"
            target="_blank"
          >
            Bol.com
          </AnchorLink>
        </h4>
      </div>
    </div>
  );
}

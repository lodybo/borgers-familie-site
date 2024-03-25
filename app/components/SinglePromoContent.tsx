import AnchorLink from "~/components/AnchorLink";

export default function SinglePromoContent() {
  return (
    <div className="space-y-10 text-xl text-center">
      <h2 className="font-plakat text-2xl">
        That&apos;s Life - BORGERS, ft Bertus
      </h2>

      <div className="embed-container">
        <iframe
          title="That's Life - BORGERS, ft Bertus"
          src="https://www.youtube.com/embed/_Ej1MgCdCi8"
          allowFullScreen
        />
      </div>

      <p className="text-sm">
        That’s Life (D. Kay/K. Gordon) <br />
        door leden van de familie BORGERS, gezongen door Bertus Borgers
      </p>

      <p className="text-xl lg:text-2xl">
        <AnchorLink to="https://bogey-music.lnk.to/fOjAFiqm" target="_blank">
          Stream/download That’s Life
        </AnchorLink>
      </p>

      <p>
        <em>That’s Life</em> is de 1e video die uitkomt van het album{" "}
        <strong>Family Life @ Blue Collar</strong>, het live album van familie
        Borgers. De Frank Sinatra klassieker was eigenlijk bedoeld voor Renie om
        te zingen. Zij was echter op de dag van de opnamen niet bij stem, zodat
        Bertus de song op zich heeft genomen.
      </p>
    </div>
  );
}

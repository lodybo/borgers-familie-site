import AnchorLink from "~/components/AnchorLink";
import {
  constructGoogleMapsUrl,
  formatDate,
  formatTime,
  formatToEuro,
} from "~/utils";

type Props = {
  startTime: string;
  doorsOpen: string;
  price: string;
  venueUrl: string;
  venue: string;
  venueAddress: string;
};

export function EventMeta({
  startTime,
  doorsOpen,
  price,
  venue,
  venueAddress,
  venueUrl,
}: Props) {
  const formattedStartTime = formatDate(startTime);
  const formattedDoorsOpen = formatTime(doorsOpen);
  const formattedPrice = formatToEuro(price);
  return (
    <ul className="text-sm grid [grid-template-areas:_'starting-time_doors-open_price'_'venue_address_.'] gap-1">
      <li className="[grid-area:_starting-time]">
        <span className="text-light-blue">Aanvangstijd</span>{" "}
        {formattedStartTime}
      </li>
      <li className="[grid-area:_doors-open]">
        <span className="text-light-blue">Deuren open</span>{" "}
        {formattedDoorsOpen}
      </li>
      <li className="[grid-area:_price]">
        <span className="text-light-blue">Prijs</span> {formattedPrice}
      </li>
      <li className="[grid-area:_venue]">
        <span className="text-light-blue">Locatie</span>{" "}
        <AnchorLink subtle to={venueUrl}>
          {venue}
        </AnchorLink>
      </li>
      <li className="[grid-area:_address]">
        <span className="text-light-blue">Adres</span>{" "}
        <AnchorLink subtle to={constructGoogleMapsUrl(venue, venueAddress)}>
          {venueAddress}
        </AnchorLink>
      </li>
    </ul>
  );
}

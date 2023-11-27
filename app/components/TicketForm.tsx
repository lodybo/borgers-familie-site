import { Form } from "@remix-run/react";
import { ChangeEvent, useState } from "react";

import Button from "~/components/Button";
import Input from "~/components/Input";
import Select from "~/components/Select";
import { Issuer } from "~/models/payments.server";
import { formatToEuro } from "~/utils";

type Props = {
  issuers: Issuer[];
  price: string;
};

export default function TicketForm({ price, issuers }: Props) {
  const formattedPrice = formatToEuro(price);
  const [ticketAmount, setTicketAmount] = useState(1);

  const handleTicketAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTicketAmount(parseInt(evt.target.value, 10));
  };

  const calculateTotal = () => {
    return formatToEuro((ticketAmount * parseFloat(price)).toString());
  };

  return (
    <Form className="space-y-4 w-2/3" method="POST">
      <Input label="Email" name="email" type="email" />

      <div>
        <Input
          label={`Aantal tickets x ${formattedPrice}`}
          name="amount"
          type="number"
          value={ticketAmount}
          onChange={handleTicketAmountChange}
          min="1"
        />
        <small className="text-sm">Totaal: {calculateTotal()}</small>
      </div>

      <Select label="Kies je bank" name="issuer">
        {issuers.map((issuer) => (
          <option key={issuer.id} value={issuer.id}>
            {issuer.name}
          </option>
        ))}
      </Select>

      <Button primary type="submit">
        Betalen
      </Button>
    </Form>
  );
}

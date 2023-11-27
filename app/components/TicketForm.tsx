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
  errors?: Record<string, string>;
};

export default function TicketForm({ price, issuers, errors }: Props) {
  const formattedPrice = formatToEuro(price);
  const [ticketAmount, setTicketAmount] = useState(1);

  const handleTicketAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTicketAmount(parseInt(evt.target.value, 10));
  };

  const calculateTotal = () => {
    if (ticketAmount === 0) {
      return formatToEuro("0");
    }
    return formatToEuro((ticketAmount * parseFloat(price)).toString());
  };

  return (
    <Form className="space-y-4 w-2/3" method="POST">
      <Input
        label="Email"
        name="email"
        type="email"
        aria-invalid={errors?.email ? true : undefined}
        aria-describedby="email-error"
      />
      {errors?.email ? (
        <span id="email-error" className="text-sm text-red-500">
          {errors.email}
        </span>
      ) : null}

      <div className="space-y-1">
        <Input
          label={`Aantal tickets á ${formattedPrice}`}
          name="amount"
          type="number"
          value={ticketAmount}
          onChange={handleTicketAmountChange}
          aria-invalid={errors?.amount ? true : undefined}
          aria-describedby="amount-error"
        />
        <small className="text-sm">Totaal: {calculateTotal()}</small>
        {errors?.amount ? (
          <span id="amount-error" className="block text-sm text-red-500">
            {errors.amount}
          </span>
        ) : null}
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

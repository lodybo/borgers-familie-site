import {
  createMollieClient,
  Locale,
  MethodInclude,
  PaymentMethod,
  PaymentStatus as MolliePaymentStatus,
  Payment as MolliePayment,
} from "@mollie/api-client";
import { MethodData } from "@mollie/api-client/dist/types/src/data/methods/data";
import { prisma } from "~/db.server";
import {
  Payment as DbPayment,
  PaymentStatus as DbPaymentStatus,
  Event,
} from "@prisma/client";
import { generateMultipleTicketNumbers } from "~/models/tickets.server";

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export interface Issuer {
  id: string;
  image: {
    size1x: string;
    size2x: string;
    svg: string;
  };
  name: string;
  resource: string;
}

export type MethodWithIssuers = MethodData & { issuers: Issuer[] };

export function getiDEALIssuers(): Promise<MethodWithIssuers> {
  return mollieClient.methods.get("ideal", {
    include: MethodInclude.issuers,
    locale: Locale.nl_NL,
  }) as unknown as Promise<MethodWithIssuers>;
}

export async function createPayment({
  issuer,
  email,
  event,
  noOfTickets,
}: {
  issuer: string;
  email: string;
  event: Event;
  noOfTickets: string;
}): Promise<MolliePayment> {
  const value = (
    parseInt(noOfTickets, 10) * parseFloat(event.price.toString())
  ).toFixed(2);

  const ticketNumbers = generateMultipleTicketNumbers(
    parseInt(noOfTickets, 10),
  );

  const redirectUrl = new URL(
    `${process.env.MOLLIE_REDIRECT_BASE_URL}/betaling/verwerken`,
  );
  redirectUrl.searchParams.set("ticketNumber", ticketNumbers[0]);

  const molliePayment = await mollieClient.payments.create({
    amount: {
      currency: "EUR",
      value,
    },
    description: event.name,
    redirectUrl: redirectUrl.toString(),
    locale: Locale.nl_NL,
    method: PaymentMethod.ideal,
    issuer,
    metadata: {
      email,
    },
  });

  const dbPayment = await prisma.payment.create({
    data: {
      amount: parseFloat(value),
      status: convertPaymentStatusses(molliePayment.status),
      molliePaymentId: molliePayment.id,
      emailAddress: email,
    },
  });

  await prisma.ticket.createMany({
    data: ticketNumbers.map((ticketNumber) => ({
      ticketNumber: parseInt(ticketNumber, 10),
      paymentId: dbPayment.id,
      eventId: event.id,
      emailAddress: email,
    })),
  });

  return molliePayment;
}

export function getPayment(paymentId: string) {
  return mollieClient.payments.get(paymentId);
}

export function updatePaymentStatus(
  paymentId: string,
  status: MolliePaymentStatus,
) {
  return prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status: convertPaymentStatusses(status),
    },
  });
}

function convertPaymentStatusses(status: MolliePaymentStatus): DbPaymentStatus {
  switch (status) {
    case MolliePaymentStatus.open:
      return DbPaymentStatus.OPEN;
    case MolliePaymentStatus.canceled:
      return DbPaymentStatus.CANCELED;
    case MolliePaymentStatus.pending:
      return DbPaymentStatus.PENDING;
    case MolliePaymentStatus.authorized:
      return DbPaymentStatus.AUTHORIZED;
    case MolliePaymentStatus.expired:
      return DbPaymentStatus.EXPIRED;
    case MolliePaymentStatus.failed:
      return DbPaymentStatus.FAILED;
    case MolliePaymentStatus.paid:
      return DbPaymentStatus.PAID;
    default:
      return DbPaymentStatus.OPEN;
  }
}

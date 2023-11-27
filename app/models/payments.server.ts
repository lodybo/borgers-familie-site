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
} from "@prisma/client";

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
  amount,
  ticketNumber,
}: {
  issuer: string;
  email: string;
  amount: string;
  ticketNumber: string;
}): Promise<[DbPayment, MolliePayment]> {
  const value = (parseInt(amount, 10) * 10).toFixed(2);
  const redirectUrl = new URL(
    `${process.env.MOLLIE_REDIRECT_BASE_URL}/betaling/verwerken`,
  );
  redirectUrl.searchParams.set("ticketNumber", ticketNumber);

  const molliePayment = await mollieClient.payments.create({
    amount: {
      currency: "EUR",
      value,
    },
    description: "Mollie test payment",
    redirectUrl: redirectUrl.toString(),
    locale: Locale.nl_NL,
    method: PaymentMethod.ideal,
    issuer,
    metadata: {
      email,
      ticketNumber,
    },
  });

  const dbPayment = await prisma.payment.create({
    data: {
      amount: parseFloat(amount),
      status: convertPaymentStatusses(molliePayment.status),
      molliePaymentId: molliePayment.id,
    },
  });

  return [dbPayment, molliePayment];
}

export function getTickets() {
  return mollieClient.payments
    .page()
    .then((payments) =>
      payments.filter((payment) => payment.metadata.ticketNumber),
    );
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

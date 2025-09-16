import { Payment } from "@prisma/client";
import { evolve, map, assoc } from "ramda";

const normalizePayment = evolve({
  amount: (a) => a.toNumber(),
  principalAmount: (a) => a.toNumber(),
  interestAmount: (a) => a.toNumber(),
});

const addPaidFields = (payment: any) =>
  assoc(
    "principalPaid",
    payment.principalAmount,
    assoc("interestPaid", payment.interestAmount, payment)
  );

export const normalizePayments = map((payment: Payment) =>
  addPaidFields(normalizePayment(payment))
);

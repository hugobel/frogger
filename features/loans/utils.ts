import { Loan, Payment } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import * as R from "ramda";
import { reduce } from "ramda";

type PaymentWithAmount = { amount: Decimal };

export function normalizeLoan<T extends Loan>(
  loan: T
): T & {
  amount: number;
  interestRate: number;
  monthlyPayment: number | null;
  totalInterest: number | null;
  totalAmount: number | null;
} {
  return R.evolve({
    amount: (x: any) => x.toNumber(),
    interestRate: (x: any) => x.toNumber(),
    monthlyPayment: (x: any) => x?.toNumber(),
    totalInterest: (x: any) => x?.toNumber(),
    totalAmount: (x: any) => x?.toNumber(),
  })(loan);
}

export function getTotalPaid(payments: Array<PaymentWithAmount>) {
  return reduce<PaymentWithAmount, number>(
    (sum, payment) => sum + payment.amount.toNumber(),
    0
  )(payments);
}

export function getStatusColor(status: string) {
  switch (status) {
    case "APPROVED":
    case "ACTIVE":
      return "bg-sea-fantasy";
    case "PENDING":
      return "bg-yellow-600";
    case "REJECTED":
    case "DEFAULTED":
      return "bg-rose-600";
    case "COMPLETED":
      return "bg-ashenvale";
    case "CANCELLED":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
}

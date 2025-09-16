import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateLoanDetails,
  LoanCreateFormData,
  LoanEditFormData,
} from "@/features/loans/loan-schema";

export function CalculatedFields() {
  const { watch } = useFormContext<LoanCreateFormData | LoanEditFormData>();

  const amount = watch("amount");
  const interestRate = watch("interestRate");
  const termMonths = watch("termMonths");
  const paymentFrequency = watch("paymentFrequency");

  const { monthlyPayment, totalInterest, totalAmount } = useMemo(
    () =>
      calculateLoanDetails(amount, interestRate, termMonths, paymentFrequency),
    [amount, interestRate, termMonths, paymentFrequency]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Calculated Fields
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-pale-grey rounded-lg">
            <p className="text-sm text-muted-foreground">Monthly Payment</p>
            <p className="text-2xl font-bold text-sea-fantasy">
              ${monthlyPayment.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-pale-grey rounded-lg">
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-2xl font-bold text-sea-fantasy">
              ${totalInterest.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-pale-grey rounded-lg">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-sea-fantasy">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import {
  LoanCreateFormData,
  LoanEditFormData,
} from "@/features/loans/loan-schema";
import { LoanType, PaymentFrequency, LoanStatus } from "@prisma/client";

export function LoanDetailsFieldset({
  canEditStatus,
}: {
  canEditStatus?: boolean;
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LoanCreateFormData | LoanEditFormData>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Loan Type
            </label>
            <Select
              value={watch("loanType")}
              onValueChange={(value: LoanType) => setValue("loanType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERSONAL">Personal</SelectItem>
                <SelectItem value="BUSINESS">Business</SelectItem>
                <SelectItem value="MORTGAGE">Mortgage</SelectItem>
                <SelectItem value="AUTO">Auto</SelectItem>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.loanType && (
              <p className="text-sm text-destructive mt-1">
                {errors.loanType.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Status
            </label>
            <Select
              disabled={!canEditStatus}
              value={watch("status")}
              onValueChange={(value: LoanStatus) => setValue("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="DEFAULTED">Defaulted</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Amount ($)
            </label>
            <Input
              type="number"
              step="0.05"
              {...register("amount", { valueAsNumber: true })}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-sm text-destructive mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Interest Rate (%)
            </label>
            <Input
              type="number"
              step="0.01"
              {...register("interestRate", { valueAsNumber: true })}
              placeholder="0.00"
            />
            {errors.interestRate && (
              <p className="text-sm text-destructive mt-1">
                {errors.interestRate.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Term (Months)
            </label>
            <Input
              type="number"
              {...register("termMonths", { valueAsNumber: true })}
              placeholder="12"
            />
            {errors.termMonths && (
              <p className="text-sm text-destructive mt-1">
                {errors.termMonths.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Payment Frequency
            </label>
            <Select
              value={watch("paymentFrequency")}
              onValueChange={(value: PaymentFrequency) =>
                setValue("paymentFrequency", value)
              }
            >
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select payment frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="BIWEEKLY">Bi-weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                <SelectItem value="ANNUALLY">Annually</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentFrequency && (
              <p className="text-sm text-destructive mt-1">
                {errors.paymentFrequency.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

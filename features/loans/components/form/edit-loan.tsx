"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanEditSchema, LoanEditFormData } from "@/features/loans/loan-schema";
import { updateLoan } from "@/features/loans/actions/loan-actions";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoanWithBorrower } from "../../types";
import { BorrowerReadonlyFieldset } from "./fieldsets/borrower";
import { LoanDetailsFieldset } from "./fieldsets/loan-details";
import { CalculatedFields } from "./fieldsets/calculated-fields";
import { AdditionalInfoFieldset } from "./fieldsets/additional-info";
import { CoSignerFieldset } from "./fieldsets/cosigner";

export function LoanEditForm({ loan }: { loan: LoanWithBorrower }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoanEditFormData>({
    resolver: zodResolver(loanEditSchema),
    defaultValues: {
      loanType: loan.loanType,
      amount: loan.amount,
      interestRate: loan.interestRate * 100, // Convert from decimal to percentage
      termMonths: loan.termMonths,
      paymentFrequency: loan.paymentFrequency as any,
      purpose: loan.purpose || "",
      notes: loan.notes || "",
      collateral: loan.collateral || "",
      coSignerName: loan.coSignerName || "",
      coSignerEmail: loan.coSignerEmail || "",
      coSignerPhone: loan.coSignerPhone || "",
      status: loan.status as any,
      applicationDate: new Date(loan.applicationDate),
      approvalDate: loan.approvalDate ? new Date(loan.approvalDate) : undefined,
      disbursementDate: loan.disbursementDate
        ? new Date(loan.disbursementDate)
        : undefined,
      maturityDate: loan.maturityDate ? new Date(loan.maturityDate) : undefined,
    },
  });

  const onSubmit = async (data: LoanEditFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Convert interest rate back to decimal for storage
      formData.append("loanType", data.loanType);
      formData.append("amount", data.amount.toString());
      formData.append("interestRate", (data.interestRate / 100).toString());
      formData.append("termMonths", data.termMonths.toString());
      formData.append("paymentFrequency", data.paymentFrequency);
      formData.append("purpose", data.purpose || "");
      formData.append("notes", data.notes || "");
      formData.append("collateral", data.collateral || "");
      formData.append("coSignerName", data.coSignerName || "");
      formData.append("coSignerEmail", data.coSignerEmail || "");
      formData.append("coSignerPhone", data.coSignerPhone || "");
      formData.append("status", data.status);
      formData.append("applicationDate", data.applicationDate.toISOString());
      if (data.approvalDate) {
        formData.append("approvalDate", data.approvalDate.toISOString());
      }
      if (data.disbursementDate) {
        formData.append(
          "disbursementDate",
          data.disbursementDate.toISOString()
        );
      }
      if (data.maturityDate) {
        formData.append("maturityDate", data.maturityDate.toISOString());
      }

      const result = await updateLoan(loan.id, formData);

      if (result.success) {
        router.push(`/loans/${loan.id}`);
        router.refresh();
      } else {
        console.error("Error updating loan:", result.error);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-4xl mb-12">
        {/* Header */}
        <div className="mb-8 flex flex-row items-end justify-between">
          <Button className="dark text-maui-mist" variant="outline" asChild>
            <Link href={`/loans/${loan.id}`}>
              <ArrowBigLeft className="mr-2 w-4 h-4" /> Back to Loan Details
            </Link>
          </Button>
          <div className="text-right">
            <h1 className="text-4xl font-bold text-hadopelagic mb-0.5">
              Edit #{loan.loanNumber}
            </h1>
          </div>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BorrowerReadonlyFieldset borrower={loan.borrower} />
            <LoanDetailsFieldset canEditStatus />
            <CalculatedFields />
            <AdditionalInfoFieldset />
            <CoSignerFieldset />

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/loans/${loan.id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isDirty}
                className="bg-primary text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

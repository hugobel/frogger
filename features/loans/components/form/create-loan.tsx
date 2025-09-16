"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loanCreateSchema,
  LoanCreateFormData,
} from "@/features/loans/loan-schema";
import { createLoan } from "@/features/loans/actions/loan-actions";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Save, Calculator } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { BorrowerSelection } from "./fieldsets/borrower-selection";
import { LoanDetailsFieldset } from "./fieldsets/loan-details";
import { CalculatedFields } from "./fieldsets/calculated-fields";
import { AdditionalInfoFieldset } from "./fieldsets/additional-info";
import { CoSignerFieldset } from "./fieldsets/cosigner";

interface LoanCreateFormProps {
  users: Array<User>;
  preSelectedUser?: User | null;
}

export function LoanCreateForm({
  users,
  preSelectedUser,
}: LoanCreateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoanCreateFormData>({
    resolver: zodResolver(loanCreateSchema),
    defaultValues: {
      borrowerId: preSelectedUser?.id || "",
      loanType: "PERSONAL",
      amount: 0,
      interestRate: 0,
      termMonths: 12,
      paymentFrequency: "MONTHLY",
      purpose: "",
      notes: "",
      collateral: "",
      coSignerName: "",
      coSignerEmail: "",
      coSignerPhone: "",
      status: "PENDING",
      applicationDate: new Date(),
    },
  });

  const onSubmit = async (data: LoanCreateFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Convert interest rate to decimal for storage
      formData.append("borrowerId", data.borrowerId);
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

      const result = await createLoan(formData);

      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Error creating loan:", result.error);
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
            <Link href="/">
              <ArrowBigLeft className="mr-2 w-4 h-4" /> Back to Dashboard
            </Link>
          </Button>
          <div className="text-right">
            <h1 className="text-4xl font-bold text-hadopelagic mb-0.5">
              Create New Loan
            </h1>
          </div>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BorrowerSelection options={users} />
            <LoanDetailsFieldset />
            <CalculatedFields />
            <AdditionalInfoFieldset />
            <CoSignerFieldset />

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Loan
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

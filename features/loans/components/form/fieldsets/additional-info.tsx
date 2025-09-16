import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  LoanCreateFormData,
  LoanEditFormData,
} from "@/features/loans/loan-schema";

export function AdditionalInfoFieldset() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoanCreateFormData | LoanEditFormData>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Purpose
          </label>
          <Input {...register("purpose")} placeholder="Loan purpose..." />
          {errors.purpose && (
            <p className="text-sm text-destructive mt-1">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Notes
          </label>
          <textarea
            {...register("notes")}
            className="bg-white flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Additional notes..."
          />
          {errors.notes && (
            <p className="text-sm text-destructive mt-1">
              {errors.notes.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Collateral
          </label>
          <Input
            {...register("collateral")}
            placeholder="Collateral description..."
          />
          {errors.collateral && (
            <p className="text-sm text-destructive mt-1">
              {errors.collateral.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LoanCreateFormData,
  LoanEditFormData,
} from "@/features/loans/loan-schema";

export function CoSignerFieldset() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoanCreateFormData | LoanEditFormData>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Co-signer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <Input
              {...register("coSignerName")}
              placeholder="Co-signer name..."
            />
            {errors.coSignerName && (
              <p className="text-sm text-destructive mt-1">
                {errors.coSignerName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <Input
              type="email"
              {...register("coSignerEmail")}
              placeholder="Co-signer email..."
            />
            {errors.coSignerEmail && (
              <p className="text-sm text-destructive mt-1">
                {errors.coSignerEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone
            </label>
            <Input
              {...register("coSignerPhone")}
              placeholder="Co-signer phone..."
            />
            {errors.coSignerPhone && (
              <p className="text-sm text-destructive mt-1">
                {errors.coSignerPhone.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

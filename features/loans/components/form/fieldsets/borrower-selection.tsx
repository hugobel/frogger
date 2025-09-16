import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { LoanCreateFormData } from "@/features/loans/loan-schema";
import { User } from "@prisma/client";

export function BorrowerSelection({ options }: { options: Array<User> }) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LoanCreateFormData>();

  // Get selected borrower
  const selected =
    options.find((user) => user.id === watch("borrowerId")) || null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrower</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Select
            value={watch("borrowerId")}
            onValueChange={(value) => setValue("borrowerId", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a borrower" />
            </SelectTrigger>
            <SelectContent>
              {options.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.borrowerId && (
            <p className="text-sm text-destructive mt-1">
              {errors.borrowerId.message}
            </p>
          )}
        </div>

        {selected && (
          <div className="mt-4 p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium [&_dt]:text-ashenvale/75">
              <div>
                <dt>Name:</dt>
                <dd>{selected.name}</dd>
                <dt className="mt-2">Email:</dt>
                <dd>{selected.email}</dd>
              </div>
              <div>
                <dt>Phone:</dt>
                <dd>{selected.phone || "N/A"}</dd>
                <dt className="mt-2">Address:</dt>
                <dd>{selected.address || "N/A"}</dd>
              </div>
            </dl>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

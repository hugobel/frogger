import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";

export function BorrowerReadonlyFieldset({ borrower }: { borrower: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrower Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <Input value={borrower.name} disabled className="bg-muted" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <Input value={borrower.email} disabled className="bg-muted" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone
            </label>
            <Input value={borrower.phone || ""} disabled className="bg-muted" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Address
            </label>
            <Input
              value={borrower.address || ""}
              disabled
              className="bg-muted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

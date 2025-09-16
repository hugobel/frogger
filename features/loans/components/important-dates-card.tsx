import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loan } from "@prisma/client";

interface ImportantDatesCardProps {
  loan: Loan;
}

export function ImportantDatesCard({ loan }: ImportantDatesCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-2">
          <div>
            <dt className="text-sm text-muted-foreground mb-1">
              Application Date
            </dt>
            <dd className="text-lg font-semibold text-hadopelagic">
              {formatDate(loan.applicationDate)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground mb-1">
              Approval Date
            </dt>
            <dd className="text-lg font-semibold text-hadopelagic">
              {formatDate(loan.approvalDate)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground mb-1">
              Disbursement Date
            </dt>
            <dd className="text-lg font-semibold text-hadopelagic">
              {formatDate(loan.disbursementDate)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground mb-1">
              Maturity Date
            </dt>
            <dd className="text-lg font-semibold text-hadopelagic">
              {formatDate(loan.maturityDate)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

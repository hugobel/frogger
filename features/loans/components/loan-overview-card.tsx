import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loan, User } from "@prisma/client";

interface LoanOverviewCardProps {
  loan: Loan & { borrower: User };
}

export function LoanOverviewCard({ loan }: LoanOverviewCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  const getStatusColor = (status: string) => {
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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col justify-start gap-4">
          <div>
            <h3 className="text-ashenvale text-3xl">{loan.borrower.name}</h3>
            <p className="text-muted-foreground text-sm">
              {loan.borrower.email}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-2">
            <div>
              <dt className="text-muted-foreground text-xs">Address</dt>
              <dd className="text-ashenvale-dark">{loan.borrower.address}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Phone</dt>
              <dd className="text-ashenvale-dark">{loan.borrower.phone}</dd>
            </div>
          </dl>
        </div>
        {/* Loan Amount */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Loan Amount
          </div>
          <p className="text-2xl font-bold text-hadopelagic">
            {formatCurrency(Number(loan.amount))}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Interest Rate
            </div>
            <p className="text-lg font-semibold text-hadopelagic">
              {formatPercentage(Number(loan.interestRate))}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Term
            </div>
            <p className="text-lg font-semibold text-hadopelagic">
              {loan.termMonths} months
            </p>
          </div>
        </div>

        {/* Monthly Payment */}
        {loan.monthlyPayment && (
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Monthly Payment</div>
            <p className="text-xl font-bold text-sea-fantasy">
              {formatCurrency(Number(loan.monthlyPayment))}
            </p>
          </div>
        )}

        {/* Total Amount */}
        {loan.totalAmount && (
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Total Amount (Principal + Interest)
            </div>
            <p className="text-lg font-semibold text-hadopelagic">
              {formatCurrency(Number(loan.totalAmount))}
            </p>
          </div>
        )}

        {/* Payment Frequency */}
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Payment Frequency</div>
          <p className="text-lg font-semibold text-hadopelagic">
            {loan.paymentFrequency}
          </p>
        </div>

        {/* Maturity Date */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Maturity Date
          </div>
          <p className="text-lg font-semibold text-hadopelagic">
            {formatDate(loan.maturityDate)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

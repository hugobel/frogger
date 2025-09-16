import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ArrowBigLeft, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { normalizePayments } from "@/features/payments";
import {
  LoanOverviewCard,
  ImportantDatesCard,
  getStatusColor,
} from "@/features/loans";
import { PaymentsDataTable } from "@/features/payments";
import { AIInsights } from "@/features/ai";

interface LoanDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function LoanDetailPage({ params }: LoanDetailPageProps) {
  const { id } = await params;

  const loan = await prisma.loan.findUnique({
    where: { id },
    include: {
      borrower: true,
      payments: {
        orderBy: { paymentDate: "desc" },
      },
    },
  });

  if (!loan) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-row items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold text-hadopelagic mb-0.5">
              #{loan.loanNumber}-{loan.loanType}
            </h1>
            <span
              className={`px-3 py-1 rounded-sm text-sm font-medium text-white ${getStatusColor(
                loan.status
              )}`}
            >
              {loan.status}
            </span>
          </div>
          <div className="flex gap-4">
            <Button className="dark text-maui-mist" variant="outline" asChild>
              <Link href={`/loans/${loan.id}/edit`}>
                <Edit className="mr-2 w-4 h-4" /> Edit Loan
              </Link>
            </Button>
            <Button className="dark text-maui-mist" variant="outline" asChild>
              <Link href="/">
                <ArrowBigLeft className="mr-2 w-4 h-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
          <div className="space-y-6">
            <LoanOverviewCard loan={loan} />
            <ImportantDatesCard loan={loan} />
          </div>
          <div className="space-y-6">
            <AIInsights
              loanId={loan.id}
              riskScore={loan.riskScore}
              aiRecommendation={loan.aiRecommendation}
              aiNotes={loan.aiNotes}
              loanStatus={loan.status}
            />
            <PaymentsDataTable data={normalizePayments(loan.payments)} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowBigLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LoanFormSkeleton } from "@/features/loans";

export default function LoanEditLoading() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-row items-end justify-between">
          <Button className="dark text-maui-mist" variant="outline" disabled>
            <ArrowBigLeft className="mr-2 w-4 h-4" /> Back to Loan Details
          </Button>
          <div className="text-right">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <LoanFormSkeleton />
      </div>
    </div>
  );
}

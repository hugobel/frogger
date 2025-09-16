import { Suspense } from "react";
import { ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { LoanOverviewSkeleton, ImportantDatesSkeleton } from "@/features/loans";
import { AIInsightsSkeleton } from "@/features/ai";
import { PaymentsTableSkeleton } from "@/features/payments";

// Main loading page component
export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto">
        <div className="mb-8 flex flex-row items-end justify-between">
          <Button className="dark text-maui-mist" variant="outline" asChild>
            <Link href="/">
              <ArrowBigLeft className="mr-2 w-4 h-4" /> Back to Dashboard
            </Link>
          </Button>
          <div className="flex flex-col items-end">
            <Skeleton className="h-10 w-32 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
          <div className="space-y-6">
            <LoanOverviewSkeleton />
            <ImportantDatesSkeleton />
          </div>
          <div className="space-y-6">
            <AIInsightsSkeleton />
            <PaymentsTableSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

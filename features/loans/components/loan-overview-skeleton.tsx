import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoanOverviewSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Overview</CardTitle>
        <div className="ml-auto">
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col justify-start gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <dl className="grid grid-cols-2 gap-2">
            <div>
              <Skeleton className="h-3 w-16 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </dl>
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-28" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

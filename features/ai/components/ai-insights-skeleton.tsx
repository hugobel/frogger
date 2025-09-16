import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain } from "lucide-react";

export function AIInsightsSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-ashenvale/90 to-sea-fantasy border-hadopelagic/50 text-pale-grey">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="size-8 text-metal-spark" />
          AI Risk Assessment
        </CardTitle>
        <div className="ml-auto">
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-64" />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>

        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

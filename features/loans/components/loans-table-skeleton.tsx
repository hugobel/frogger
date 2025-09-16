import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LoansTableSkeleton() {
  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Loans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="rounded-xl border border-sea-fantasy/25 text-hadopelagic">
            <Table className="bg-stone-50/50 rounded-xl overflow-hidden">
              <TableHeader>
                <TableRow className="bg-sea-fantasy/15 hover:bg-sea-fantasy/15">
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-8" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-12" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-8" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-12" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead className="text-xs first:pl-6 last:pr-6">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

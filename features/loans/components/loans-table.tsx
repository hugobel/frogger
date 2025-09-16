"use client";

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loan, User } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";

type LoanWithBorrower = Omit<
  Loan,
  "amount" | "interestRate" | "monthlyPayment" | "totalInterest" | "totalAmount"
> & {
  amount: number;
  interestRate: number;
  monthlyPayment: number | null;
  totalInterest: number | null;
  totalAmount: number | null;
  totalPaid: number;
  borrower: User;
};

// Status badge component
function StatusBadge({ status }: { status: Loan["status"] }) {
  const statusConfig = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    APPROVED: { color: "bg-green-100 text-green-800", label: "Approved" },
    REJECTED: { color: "bg-red-100 text-red-800", label: "Rejected" },
    ACTIVE: { color: "bg-blue-100 text-blue-800", label: "Active" },
    COMPLETED: { color: "bg-gray-100 text-gray-800", label: "Completed" },
    DEFAULTED: { color: "bg-red-100 text-red-800", label: "Defaulted" },
    CANCELLED: { color: "bg-gray-100 text-gray-800", label: "Cancelled" },
  };

  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

// Format currency
function formatCurrency(amount: number | null) {
  if (amount === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Format date
function formatDate(date: Date | null) {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Define columns
const createColumns = (): ColumnDef<LoanWithBorrower>[] => [
  {
    accessorKey: "loanNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">
        <Link
          href={`/loans/${row.original.id}`}
          className="text-emerald-600 hover:text-sea-fantasy/80"
        >
          {row.getValue("loanNumber")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "borrower.name",
    header: "Borrower",
    cell: ({ row }) => {
      const borrower = row.original.borrower;
      return (
        <div>
          <div className="font-medium">{borrower.name}</div>
          <div className="text-sm text-muted-foreground">{borrower.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs justify-end w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <div className="font-medium text-right tabular-nums text-sea-fantasy">
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "interestRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs justify-end w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Interest Rate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rate = parseFloat(row.getValue("interestRate"));
      return (
        <div className="text-right tabular-nums">
          {(rate * 100).toFixed(2)}%
        </div>
      );
    },
  },
  {
    accessorKey: "termMonths",
    header: "Term",
    cell: ({ row }) => {
      const months = row.getValue("termMonths") as number;
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return (
        <div className="text-right tabular-nums">
          {years > 0 && `${years}y`}
          {remainingMonths > 0 && ` ${remainingMonths}m`}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue("status")} />;
    },
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Application Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("applicationDate"))}</div>;
    },
  },
  {
    accessorKey: "monthlyPayment",
    header: "Monthly Payment",
    cell: ({ row }) => {
      const payment = row.getValue("monthlyPayment") as number | null;
      return (
        <div className="font-medium text-right tabular-nums text-sea-fantasy">
          {formatCurrency(payment)}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPaid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs justify-end w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Paid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalPaid = row.getValue("totalPaid") as number;
      return (
        <div className="font-medium text-right tabular-nums text-sea-fantasy">
          {totalPaid > 0 ? formatCurrency(totalPaid) : "--"}
        </div>
      );
    },
  },
];

interface DataTableProps {
  data: LoanWithBorrower[];
}

export function LoansTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const columns = React.useMemo(() => createColumns(), []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle>Loans</CardTitle>
        <CardAction>
          <Button className="dark text-maui-mist" variant="outline" asChild>
            <Link href="/loans/new">New Loan</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="rounded-xl border border-sea-fantasy/25 text-hadopelagic">
            <Table className="bg-stone-50/50 rounded-xl overflow-hidden">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-sea-fantasy/15 hover:bg-sea-fantasy/15"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-xs first:pl-6 last:pr-6"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

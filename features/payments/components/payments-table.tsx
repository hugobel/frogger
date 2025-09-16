"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { ArrowUpDown, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PaymentData = Payment;

// Status badge component
function PaymentStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    PAID: { color: "bg-green-100 text-green-800", label: "Paid" },
    LATE: { color: "bg-red-100 text-red-800", label: "Late" },
    MISSED: { color: "bg-red-100 text-red-800", label: "Missed" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    color: "bg-gray-100 text-gray-800",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

// Payment method badge component
function PaymentMethodBadge({ method }: { method: string | null }) {
  if (!method)
    return <span className="text-muted-foreground text-sm">N/A</span>;

  const methodConfig = {
    CASH: { color: "bg-green-100 text-green-800", label: "Cash" },
    CHECK: { color: "bg-blue-100 text-blue-800", label: "Check" },
    BANK_TRANSFER: {
      color: "bg-purple-100 text-purple-800",
      label: "Bank Transfer",
    },
    CARD: { color: "bg-orange-100 text-orange-800", label: "Card" },
  };

  const config = methodConfig[method as keyof typeof methodConfig] || {
    color: "bg-gray-100 text-gray-800",
    label: method,
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

// Format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Format date
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Format date with time
function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// Define columns
const createPaymentColumns = (): ColumnDef<PaymentData>[] => [
  {
    accessorKey: "id",
    header: "Payment ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {row.getValue("id")?.toString().slice(-8)}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <div className="font-medium text-sea-fantasy">
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "principalAmount",
    header: "Principal",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("principalAmount"));
      return (
        <div className="text-sm text-sea-fantasy">{formatCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: "interestAmount",
    header: "Interest",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("interestAmount"));
      return (
        <div className="text-sm text-sea-fantasy">{formatCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as Date;
      return <div className="text-sm">{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("paymentDate") as Date;
      return <div className="text-sm">{formatDateTime(date)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <PaymentStatusBadge status={row.getValue("status")} />;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => {
      return <PaymentMethodBadge method={row.getValue("paymentMethod")} />;
    },
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => {
      const reference = row.getValue("reference") as string | null;
      return (
        <div className="font-mono text-xs text-muted-foreground">
          {reference || "N/A"}
        </div>
      );
    },
  },
];

interface PaymentsDataTableProps {
  data: PaymentData[];
}

export function PaymentsDataTable({ data }: PaymentsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const paymentColumns = React.useMemo(() => createPaymentColumns(), []);

  console.info(data.length);

  const table = useReactTable({
    data,
    columns: paymentColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-sea-fantasy" />
          Payment History
        </CardTitle>
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
                      className="hover:bg-sea-fantasy/5"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
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
                      colSpan={paymentColumns.length}
                      className="h-24 text-center"
                    >
                      <div className="flex flex-col items-center justify-center py-8">
                        <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          No payments found
                        </p>
                      </div>
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

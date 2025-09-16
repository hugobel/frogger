import { notFound } from "next/navigation";
import { getLoanForEdit } from "@/features/loans";
import { LoanEditForm } from "@/features/loans";

interface LoanEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function LoanEditPage({ params }: LoanEditPageProps) {
  const { id } = await params;

  const loan = await getLoanForEdit(id);

  if (!loan) {
    notFound();
  }

  return <LoanEditForm loan={loan} />;
}

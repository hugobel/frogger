import { LoansTableSkeleton } from "@/features/loans";

export default function Loading() {
  return (
    <>
      <h1 className="text-center bg-gradient-to-br from-maui-mist from-0% to-lime-50/80 to-90% bg-clip-text text-6xl font-bold tracking-tight text-transparent">
        Velora Capital
      </h1>
      <p className="text-xl text-hadopelagic/75 w-full text-center mb-8">
        Turning Vision into Reality
      </p>
      <LoansTableSkeleton />
    </>
  );
}

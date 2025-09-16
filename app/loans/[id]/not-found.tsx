import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-8">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sea-fantasy to-metal-spark animate-pulse">
          404
        </h1>
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce text-sea-fantasy font-bold">
          $
        </div>
        <div className="absolute -bottom-2 -left-2 text-3xl animate-pulse text-metal-spark font-bold">
          %
        </div>
      </div>

      {/* Quirky message */}
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <h2 className="text-3xl font-semibold text-foreground">
          Oops! This loan seems to have vanished!
        </h2>
        <p className="text-lg text-ashenvale/90 max-w-md">
          Looks like this loan application took a detour to the Bermuda Triangle
          of the internet. Don't worry, it's probably just taking a coffee
          break!
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          asChild
          size="lg"
          className="bg-sea-fantasy hover:bg-sea-fantasy/90 text-white"
        >
          <Link href="/">Back to Loans</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/loans/new">Create New Loan</Link>
        </Button>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 text-2xl animate-bounce text-sea-fantasy font-bold"
        style={{ animationDuration: "3s" }}
      >
        $
      </div>
      <div
        className="absolute top-32 right-16 text-4xl animate-pulse text-metal-spark font-bold"
        style={{ animationDelay: "1s" }}
      >
        #
      </div>
      <div
        className="absolute bottom-20 left-20 animate-pulse text-sea-fantasy font-bold text-6xl"
        style={{ animationDelay: "2s" }}
      >
        &
      </div>
      <div
        className="absolute bottom-32 right-10 text-8xl animate-bounce text-metal-spark font-bold"
        style={{ animationDelay: "0.5s" }}
      >
        *
      </div>
    </div>
  );
}

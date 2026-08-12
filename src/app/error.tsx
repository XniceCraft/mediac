"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WarningIcon, ArrowClockwiseIcon, HouseIcon } from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-border bg-card/60 w-full max-w-lg space-y-6 rounded-2xl border p-8 text-center shadow-lg backdrop-blur-sm sm:p-10">
          <div className="bg-destructive/10 text-destructive mx-auto flex size-16 items-center justify-center rounded-2xl">
            <WarningIcon className="size-8" />
          </div>

          <div className="space-y-2">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Application Error
            </span>
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Something Went Wrong
            </h1>
            <p className="text-muted-foreground text-sm">
              An unexpected error occurred while processing your request. Please try again or return
              home.
            </p>
            {error.digest && (
              <p className="bg-muted text-muted-foreground mx-auto max-w-xs rounded-lg px-3 py-1.5 font-mono text-xs">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Button onClick={() => retry()} className="w-full sm:w-auto">
              <ArrowClockwiseIcon className="size-4" />
              Try Again
            </Button>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
            >
              <HouseIcon className="size-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

import Link from "next/link";
import { WarningOctagonIcon, HouseIcon } from "@phosphor-icons/react/ssr";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-border bg-card/60 w-full max-w-lg space-y-6 rounded-2xl border p-8 text-center shadow-lg backdrop-blur-sm sm:p-10">
          <div className="bg-destructive/10 text-destructive mx-auto flex size-16 items-center justify-center rounded-2xl">
            <WarningOctagonIcon className="size-8" />
          </div>

          <div className="space-y-4">
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-sm">
              The page you are looking for doesn&apos;t exist, was removed, or had its name changed.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }), "w-full sm:w-auto")}
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

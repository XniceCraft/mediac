"use client";

import { useEffect } from "react";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { WarningIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function GlobalError({
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
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        plusJakartaSans.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col items-center justify-center p-4">
        <div className="border-border bg-card/60 w-full max-w-lg space-y-6 rounded-2xl border p-8 text-center shadow-lg backdrop-blur-sm sm:p-10">
          <div className="bg-destructive/10 text-destructive mx-auto flex size-16 items-center justify-center rounded-2xl">
            <WarningIcon className="size-8" />
          </div>

          <div className="space-y-2">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Critical Error
            </span>
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              System Encountered an Error
            </h1>
            <p className="text-muted-foreground text-sm">
              A critical error occurred while loading the application. Please reload or try again.
            </p>
            {error.digest && (
              <p className="bg-muted text-muted-foreground mx-auto max-w-xs rounded-lg px-3 py-1.5 font-mono text-xs">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center pt-2">
            <Button onClick={() => retry()} className="w-full sm:w-auto">
              <ArrowClockwiseIcon className="mr-2 size-4" />
              Reload Application
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

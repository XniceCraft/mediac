import Link from "next/link";
import {
  ArrowsLeftRightIcon,
  FileCodeIcon,
  LightningIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  return (
    <header className="border-border bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-primary flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
          >
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg shadow-sm">
              <ArrowsLeftRightIcon className="size-5 text-white" />
            </div>
            <span className="text-primary text-xl font-bold tracking-tight">
              Media<span className="text-accent">C</span>
            </span>
            <Badge
              variant="outline"
              className="text-muted-foreground border-border hidden text-[10px] font-bold tracking-wider uppercase sm:inline-flex"
            >
              v1.0
            </Badge>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <Link
              href="/"
              className="text-foreground hover:text-primary cursor-pointer transition-colors"
            >
              Converter
            </Link>
            <Link
              href="/formats"
              className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
            >
              Supported Formats
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-muted-foreground mr-2 hidden items-center gap-4 text-xs lg:flex">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon className="text-accent size-4" />
              100% Secure
            </span>
            <span className="flex items-center gap-1.5">
              <LightningIcon className="text-secondary size-4" />
              Instant Browser Processing
            </span>
          </div>

          <Link href="/formats">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              <FileCodeIcon className="mr-1 size-4" />
              Format List
            </Button>
          </Link>
          <Link href="/">
            <Button variant="default" size="sm">
              Start Converting
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

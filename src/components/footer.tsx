import Link from "next/link";
import { ArrowsLeftRightIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-border bg-background mt-auto w-full border-t py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <div className="text-primary flex items-center gap-2 text-lg font-bold">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                <ArrowsLeftRightIcon className="size-4 text-white" />
              </div>
              <span>
                Media<span className="text-accent">C</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm">
              Fast, privacy-focused media converter for audio, video, image, and document files
              directly in your web browser.
            </p>
          </div>

          <div>
            <h4 className="text-foreground mb-3 text-sm font-semibold">Converter Tools</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary cursor-pointer transition-colors">
                  Audio Converter
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary cursor-pointer transition-colors">
                  Video Converter
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary cursor-pointer transition-colors">
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary cursor-pointer transition-colors">
                  Document Converter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground mb-3 text-sm font-semibold">Resources</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link
                  href="/formats"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Supported Formats
                </Link>
              </li>
              <li>
                <span className="text-accent flex items-center gap-1 font-medium">
                  <ShieldCheckIcon className="size-4" /> Client-side Privacy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} MediaC Utility. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern web standards and flat design principles.
          </p>
        </div>
      </div>
    </footer>
  );
}

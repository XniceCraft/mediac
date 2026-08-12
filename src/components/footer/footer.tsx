import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border bg-background mt-auto w-full border-t py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <div className="text-primary flex items-center gap-2 text-lg font-bold">
              <img
                src="/assets/image/logo.webp"
                alt="MediaC Logo"
                className="block size-8 rounded-lg"
              />
              <span>
                Media<span className="text-accent">C</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm">
              Fast, privacy-focused media converter for images and documents directly in your web
              browser.
            </p>
          </div>

          <nav aria-label="Footer Navigation">
            <h2 className="text-foreground mb-3 text-sm font-semibold">Resources</h2>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary cursor-pointer transition-colors">
                  Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/formats"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Supported Formats
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-border text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} MediaC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { NavbarLink } from "./navbar-link";

const routes = [
  {
    href: "/",
    label: "Converter",
  },
  {
    href: "/formats",
    label: "Supported Formats",
  },
] as const;

export function Navbar() {
  return (
    <header className="border-border bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:justify-center sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-primary top-1/2 left-8 flex items-center gap-2 text-xl font-bold tracking-tight transition-opacity hover:opacity-90 sm:absolute sm:-translate-y-1/2"
        >
          <img src="/assets/image/logo.webp" alt="Logo" className="block size-8 rounded-lg" />

          <span className="text-primary text-xl font-bold tracking-tight">
            Media<span className="text-accent">C</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold">
          {routes.map((route) => (
            <NavbarLink key={route.href} href={route.href}>
              {route.label}
            </NavbarLink>
          ))}
        </nav>

        <div />
      </div>
    </header>
  );
}

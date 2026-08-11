"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarLink({
  href,
  children,
}: {
  href: React.ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-muted-foreground hover:text-primary cursor-pointer transition-colors",
        isActive && "text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

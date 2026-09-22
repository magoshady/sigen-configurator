"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANDS } from "@/lib/brands";

/** Tabs to switch between battery brand finders, shown on every brand page. */
export default function BrandNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Battery brand" className="bg-card border-b border-rule">
      <div className="mx-auto w-full max-w-4xl px-6 flex gap-1 overflow-x-auto">
        {BRANDS.map((brand) => {
          const active =
            brand.href === "/" ? pathname === "/" : pathname.startsWith(brand.href);
          return (
            <Link
              key={brand.slug}
              href={brand.href}
              aria-current={active ? "page" : undefined}
              className={`relative px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                active
                  ? "text-ink font-medium after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-green"
                  : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              {brand.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

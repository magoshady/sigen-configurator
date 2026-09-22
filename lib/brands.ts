import { BRAND as sigenergy } from "@/lib/sigenergy";
import type { BrandMeta } from "@/lib/brand-types";

/**
 * Every brand finder on the site. Adding a brand is one data module
 * (exporting a `BRAND` of this shape) plus one entry here.
 */
export const BRANDS: BrandMeta[] = [sigenergy];

/** The brand whose route the given pathname falls under, defaulting to the first brand. */
export function brandForPath(pathname: string): BrandMeta {
  return (
    BRANDS.find((b) =>
      b.href === "/" ? pathname === "/" : pathname.startsWith(b.href)
    ) ?? BRANDS[0]
  );
}

import type { BrandMeta } from "@/lib/brand-types";

export const BRAND: BrandMeta = {
  slug: "byd",
  label: "BYD",
  href: "/byd",
  manufacturer: "BYD",
  dataSource: "BYD rows of the CEC approved battery list",
};

export type BydRow = {
  /** Full CEC-approved model name, e.g. "HVS 5.1" */
  m: string;
  usable: number;
  nominal: number;
  ap: string;
  ex: string;
};

/**
 * How a family's approved capacities are built up. Every family on the CEC
 * list lists nominal === usable, so rows only carry one capacity figure.
 *
 * - "modules": one module size, quantity sets the capacity (HVS, HVM, HVM+, HVB, LVS)
 * - "dual-modules": two module sizes can be mixed (HVE)
 * - "per-unit": the model string never changes — quantity alone sets the total (LV Flex)
 * - "fixed": a single, non-modular unit (LVL)
 */
export type BydFamilyKind = "modules" | "dual-modules" | "per-unit" | "fixed";

export type BydFamily = {
  slug: string;
  label: string;
  manufacturer: "Shenzhen BYD Electronics Co Ltd" | "Shanwei BYD Auto Co Ltd";
  kind: BydFamilyKind;
  /** One line describing what makes this family recognisable. */
  blurb: string;
  rows: BydRow[];

  // kind: "modules"
  moduleKwh?: number;
  minModules?: number;
  maxModules?: number;

  // kind: "dual-modules" (HVE)
  moduleKwhA?: number;
  moduleKwhB?: number;
  labelA?: string;
  labelB?: string;
  maxA?: number;
  maxB?: number;
};

/**
 * BYD rows of the CEC approved battery list, grouped by family. Verified
 * against BYD's published per-module capacities — see the arithmetic notes
 * in the PR description, not just transcribed from the CSV.
 */
export const FAMILIES: BydFamily[] = [
  {
    slug: "hvs",
    label: "HVS",
    manufacturer: "Shenzhen BYD Electronics Co Ltd",
    kind: "modules",
    blurb:
      "Stacked tower, 2–5 modules. Each HVS module is 2.56 kWh usable — check the module nameplate reads “Model: HVS”, not HVM or HVM+.",
    moduleKwh: 2.56,
    minModules: 2,
    maxModules: 5,
    rows: [
      { m: "HVS 5.1", usable: 5.12, nominal: 5.12, ap: "19/10/2023", ex: "19/10/2026" },
      { m: "HVS 7.7", usable: 7.68, nominal: 7.68, ap: "19/10/2023", ex: "19/10/2026" },
      { m: "HVS 10.2", usable: 10.24, nominal: 10.24, ap: "19/10/2023", ex: "19/10/2026" },
      { m: "HVS 12.8", usable: 12.8, nominal: 12.8, ap: "19/10/2023", ex: "19/10/2026" },
    ],
  },
  {
    slug: "hvm",
    label: "HVM",
    manufacturer: "Shenzhen BYD Electronics Co Ltd",
    kind: "modules",
    blurb:
      "Stacked tower, 3–8 modules — taller than a full HVS stack. Each HVM module is 2.76 kWh usable; the module nameplate reads “Model: HVM”.",
    moduleKwh: 2.76,
    minModules: 3,
    maxModules: 8,
    rows: [
      { m: "HVM 8.3", usable: 8.28, nominal: 8.28, ap: "8/06/2023", ex: "5/12/2026" },
      { m: "HVM 11.0", usable: 11.04, nominal: 11.04, ap: "8/06/2023", ex: "5/12/2026" },
      { m: "HVM 13.8", usable: 13.8, nominal: 13.8, ap: "8/06/2023", ex: "5/12/2026" },
      { m: "HVM 16.6", usable: 16.56, nominal: 16.56, ap: "8/06/2023", ex: "5/12/2026" },
      { m: "HVM 19.3", usable: 19.32, nominal: 19.32, ap: "8/06/2023", ex: "5/12/2026" },
      { m: "HVM 22.1", usable: 22.08, nominal: 22.08, ap: "8/06/2023", ex: "5/12/2026" },
    ],
  },
  {
    slug: "hvm-plus",
    label: "HVM+",
    manufacturer: "Shanwei BYD Auto Co Ltd",
    kind: "modules",
    blurb:
      "Same tower and the same capacities as HVM, from a different manufacturer entity. The model number on the paperwork must include the “+” — HVM and HVM+ are separate CEC listings, so check the nameplate's printed series and manufacturer line, not just the capacity.",
    moduleKwh: 2.76,
    minModules: 3,
    maxModules: 8,
    rows: [
      { m: "HVM+ 8.3", usable: 8.28, nominal: 8.28, ap: "30/06/2026", ex: "31/12/2027" },
      { m: "HVM+ 11.0", usable: 11.04, nominal: 11.04, ap: "30/06/2026", ex: "31/12/2027" },
      { m: "HVM+ 13.8", usable: 13.8, nominal: 13.8, ap: "30/06/2026", ex: "31/12/2027" },
      { m: "HVM+ 16.6", usable: 16.56, nominal: 16.56, ap: "30/06/2026", ex: "31/12/2027" },
      { m: "HVM+ 19.3", usable: 19.32, nominal: 19.32, ap: "30/06/2026", ex: "31/12/2027" },
      { m: "HVM+ 22.1", usable: 22.08, nominal: 22.08, ap: "30/06/2026", ex: "31/12/2027" },
    ],
  },
  {
    slug: "hvb",
    label: "HVB",
    manufacturer: "Shanwei BYD Auto Co Ltd",
    kind: "modules",
    blurb:
      "Stacked tower, 2–10 modules — can run taller than HVS/HVM/HVM+. Each HVB module is approximately 2.97 kWh usable; the module nameplate reads “Model: HVB”.",
    moduleKwh: 2.969,
    minModules: 2,
    maxModules: 10,
    rows: [
      { m: "HVB 5.9", usable: 5.94, nominal: 5.94, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 8.9", usable: 8.91, nominal: 8.91, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 11.8", usable: 11.88, nominal: 11.88, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 14.8", usable: 14.85, nominal: 14.85, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 17.8", usable: 17.82, nominal: 17.82, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 20.7", usable: 20.79, nominal: 20.79, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 23.7", usable: 23.76, nominal: 23.76, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 26.7", usable: 26.72, nominal: 26.72, ap: "11/06/2026", ex: "31/12/2027" },
      { m: "HVB 29.6", usable: 29.69, nominal: 29.69, ap: "11/06/2026", ex: "31/12/2027" },
    ],
  },
  {
    slug: "hve",
    label: "HVE",
    manufacturer: "Shanwei BYD Auto Co Ltd",
    kind: "dual-modules",
    blurb:
      "Slim wall-mounted tower, visually distinct from the other stacks. Mixes two module sizes — 4.29 kWh and 6.43 kWh usable — so module count alone doesn't fix the model; you need the count of each size.",
    moduleKwhA: 4.29,
    moduleKwhB: 6.43,
    labelA: "4.29 kWh module",
    labelB: "6.43 kWh module",
    maxA: 4,
    maxB: 4,
    rows: [
      { m: "HVE 6.4", usable: 6.43, nominal: 6.43, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 8.5", usable: 8.58, nominal: 8.58, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 10.7", usable: 10.72, nominal: 10.72, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 12.8-1", usable: 12.86, nominal: 12.86, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 12.8-2", usable: 12.87, nominal: 12.87, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 15.0", usable: 15.01, nominal: 15.01, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 17.1-1", usable: 17.16, nominal: 17.16, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 17.1-2", usable: 17.16, nominal: 17.16, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 19.2", usable: 19.29, nominal: 19.29, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 19.3", usable: 19.3, nominal: 19.3, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 21.4", usable: 21.44, nominal: 21.44, ap: "2/12/2025", ex: "31/12/2027" },
      { m: "HVE 23.5", usable: 23.58, nominal: 23.58, ap: "2/12/2025", ex: "31/12/2027" },
    ],
  },
  {
    slug: "lvs",
    label: "LVS",
    manufacturer: "Shenzhen BYD Electronics Co Ltd",
    kind: "modules",
    blurb:
      "Low-voltage stacked tower, 1–6 modules, each 4.0 kWh usable. Looks like HVS/HVM/HVM+/HVB — the nameplate's voltage figures (not just the model text) are the giveaway, since a low-voltage stack runs a very different operating range.",
    moduleKwh: 4.0,
    minModules: 1,
    maxModules: 6,
    rows: [
      { m: "LVS 4.0", usable: 4, nominal: 4, ap: "31/10/2023", ex: "7/12/2026" },
      { m: "LVS 8.0", usable: 8, nominal: 8, ap: "31/10/2023", ex: "7/12/2026" },
      { m: "LVS 12.0", usable: 12, nominal: 12, ap: "31/10/2023", ex: "7/12/2026" },
      { m: "LVS 16.0", usable: 16, nominal: 16, ap: "31/10/2023", ex: "7/12/2026" },
      { m: "LVS 20.0", usable: 20, nominal: 20, ap: "31/10/2023", ex: "7/12/2026" },
      { m: "LVS 24.0", usable: 24, nominal: 24, ap: "31/10/2023", ex: "7/12/2026" },
    ],
  },
  {
    slug: "lvl",
    label: "LVL",
    manufacturer: "Shenzhen BYD Electronics Co Ltd",
    kind: "fixed",
    blurb:
      "Large single cabinet, not built from separate modules — the nameplate names the complete unit directly.",
    rows: [
      { m: "Battery-Box Premium LVL15.4", usable: 15.36, nominal: 15.36, ap: "20/04/2023", ex: "19/07/2026" },
      { m: "Battery-Box Premium LVL15.4", usable: 15.36, nominal: 15.36, ap: "22/07/2026", ex: "31/12/2027" },
    ],
  },
  {
    slug: "lv-flex",
    label: "LV Flex",
    manufacturer: "Shenzhen BYD Electronics Co Ltd",
    kind: "per-unit",
    blurb:
      "Rack-mounted modules inside an enclosure — visually quite different from the vertical stacks. Every module is CEC-listed as the same model, “LV Flex”, at 5.0 kWh usable each; the total is simply the module count.",
    moduleKwh: 5.0,
    rows: [{ m: "LV Flex", usable: 5, nominal: 5, ap: "25/06/2025", ex: "31/12/2027" }],
  },
];

export const ALL_ROWS: (BydRow & { family: string })[] = FAMILIES.flatMap((f) =>
  f.rows.map((r) => ({ ...r, family: f.label }))
);

export function normalizeModel(s: string): string {
  return String(s)
    .toLowerCase()
    .replace(/\s+/g, "");
}

export type CapacityMatch = {
  /** Rows whose listed capacity exactly matches the requested total. */
  exact: BydRow[];
  /** Rows within rounding distance, used only when there's no exact match. */
  nearest: BydRow[];
};

/** Matches a computed total (kWh, already rounded to 2dp) against a family's rows. */
export function matchByCapacity(rows: BydRow[], total: number): CapacityMatch {
  const exact = rows.filter((r) => Math.abs(r.usable - total) < 0.005);
  if (exact.length > 0) return { exact, nearest: [] };
  const nearest = rows
    .map((r) => ({ r, d: Math.abs(r.usable - total) }))
    .filter((x) => x.d < 0.03)
    .sort((a, b) => a.d - b.d)
    .map((x) => x.r);
  return { exact: [], nearest };
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export type Verdict =
  | { kind: "empty" }
  | { kind: "match"; family: BydFamily; row: BydRow }
  | { kind: "none"; raw: string; near: (BydRow & { family: string })[] };

export function computeVerdict(raw: string): Verdict {
  const trimmed = raw.trim();
  const n = normalizeModel(trimmed);
  if (!n) return { kind: "empty" };

  for (const family of FAMILIES) {
    const row = family.rows.find((r) => normalizeModel(r.m) === n);
    if (row) return { kind: "match", family, row };
  }

  const near = ALL_ROWS.filter((r) => {
    const rn = normalizeModel(r.m);
    return rn.includes(n) || n.includes(rn);
  }).slice(0, 5);
  return { kind: "none", raw: trimmed, near };
}

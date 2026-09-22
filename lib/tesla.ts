import type { BrandMeta } from "@/lib/brand-types";

export const BRAND: BrandMeta = {
  slug: "tesla",
  label: "Tesla",
  href: "/tesla",
  manufacturer: "Tesla, Inc.",
  dataSource: "Tesla rows of the CEC approved battery list",
};

export type TeslaSeries =
  | "Powerwall 3 and Expansions"
  | "Powerwall 3 (earlier listing)"
  | "Powerwall 3 AC"
  | "Tesla Powerwall";

export const DC_SERIES_NEW: TeslaSeries = "Powerwall 3 and Expansions";
export const DC_SERIES_OLD: TeslaSeries = "Powerwall 3 (earlier listing)";
export const AC_SERIES: TeslaSeries = "Powerwall 3 AC";
export const PW2_SERIES: TeslaSeries = "Tesla Powerwall";

export const STANDARD_SUFFIX = "(AS4777-2 2020)";

export type TeslaRow = {
  /** Full CEC-approved model name, e.g. "1707000-10 kVA-40.5" */
  m: string;
  s: TeslaSeries;
  /** Nominal capacity, kWh */
  nom: number;
  /** Usable capacity, kWh */
  use: number;
  /** Approval date, as listed on the CEC register */
  ap: string;
  /** Expiry date, as listed on the CEC register */
  ex: string;
  expired?: boolean;
};

/** Tesla rows of the CEC approved battery list. */
export const ROWS: TeslaRow[] = [
  { m: "1707000-5 kVA", s: DC_SERIES_OLD, nom: 14.4, use: 13.5, ap: "17/10/2024", ex: "17/10/2027" },
  { m: "1707000-5 kVA-13.5", s: DC_SERIES_NEW, nom: 14.4, use: 13.5, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-5 kVA-27", s: DC_SERIES_NEW, nom: 28.8, use: 27, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-5 kVA-40.5", s: DC_SERIES_NEW, nom: 43.2, use: 40.5, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-5 kVA-54", s: DC_SERIES_NEW, nom: 57.6, use: 54, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-10 kVA", s: DC_SERIES_OLD, nom: 14.4, use: 13.5, ap: "17/10/2024", ex: "17/10/2027" },
  { m: "1707000-10 kVA-13.5", s: DC_SERIES_NEW, nom: 14.4, use: 13.5, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-10 kVA-27", s: DC_SERIES_NEW, nom: 28.8, use: 27, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-10 kVA-40.5", s: DC_SERIES_NEW, nom: 43.2, use: 40.5, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-10 kVA-54", s: DC_SERIES_NEW, nom: 57.6, use: 54, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-11.04 kVA", s: DC_SERIES_OLD, nom: 14.4, use: 13.5, ap: "17/10/2024", ex: "17/10/2027" },
  { m: "1707000-11.04 kVA-13.5", s: DC_SERIES_NEW, nom: 14.4, use: 13.5, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-11.04 kVA-27", s: DC_SERIES_NEW, nom: 28.8, use: 27, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-11.04 kVA-40.5", s: DC_SERIES_NEW, nom: 43.2, use: 40.5, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-11.04 kVA-54", s: DC_SERIES_NEW, nom: 57.6, use: 54, ap: "19/08/2025", ex: "31/12/2027" },
  { m: "1707000-ACPW3-13.5", s: AC_SERIES, nom: 14.4, use: 13.5, ap: "5/05/2026", ex: "31/12/2027" },
  { m: "1707000-ACPW3-27", s: AC_SERIES, nom: 28.8, use: 27, ap: "5/05/2026", ex: "31/12/2027" },
  { m: "1707000-ACPW3-40.5", s: AC_SERIES, nom: 43.2, use: 40.5, ap: "5/05/2026", ex: "31/12/2027" },
  { m: "1707000-ACPW3-54", s: AC_SERIES, nom: 57.6, use: 54, ap: "5/05/2026", ex: "31/12/2027" },
  { m: "AC Powerwall", s: PW2_SERIES, nom: 14, use: 13.5, ap: "23/08/2022", ex: "23/08/2025", expired: true },
];

/** capacity suffix -> expansion count: 13.5 = none, 27 = +1, 40.5 = +2, 54 = +3 */
export const CAPS: Record<0 | 1 | 2 | 3, number> = { 0: 13.5, 1: 27, 2: 40.5, 3: 54 };

export const NOMINAL_FOR_USABLE: Record<number, number> = {
  13.5: 14.4,
  27: 28.8,
  40.5: 43.2,
  54: 57.6,
};

export function normalizeModel(s: string): string {
  return String(s)
    .toLowerCase()
    .replace(/as4777[-\s]*2?\s*2020/g, "")
    .replace(/[^a-z0-9.]/g, "");
}

export const MODEL_INDEX: Record<string, TeslaRow> = Object.fromEntries(
  ROWS.map((r) => [normalizeModel(r.m), r])
);

export function expansionsForUsable(use: number): 0 | 1 | 2 | 3 {
  return use === 13.5 ? 0 : use === 27 ? 1 : use === 40.5 ? 2 : 3;
}

/** Extracts the "10" out of "1707000-10 kVA-40.5", or null if there isn't one (ACPW3 models). */
export function kvaFromModel(model: string): string | null {
  const match = model.match(/-([\d.]+) kVA/);
  return match ? match[1] : null;
}

export type BuildInput = {
  ptype: "dc" | "ac";
  kva: "5" | "10" | "11.04";
  exp: 0 | 1 | 2 | 3;
};

export type BuildResult = {
  model: string;
  usableKwh: number;
  nominalKwh: number;
  approved: string;
  expires: string;
  isAc: boolean;
  /** Whether to show the note about the earlier, suffix-less listing. */
  altNote: boolean;
};

export function computeBuild({ ptype, kva, exp }: BuildInput): BuildResult {
  const isAc = ptype === "ac";
  const usableKwh = CAPS[exp];
  const model = isAc
    ? `1707000-ACPW3-${usableKwh}`
    : `1707000-${kva} kVA-${usableKwh}`;
  const row = MODEL_INDEX[normalizeModel(model)];

  return {
    model,
    usableKwh,
    nominalKwh: row ? row.nom : NOMINAL_FOR_USABLE[usableKwh],
    approved: row ? row.ap : "—",
    expires: row ? row.ex : "—",
    isAc,
    altNote: !isAc && exp === 0,
  };
}

export type Verdict =
  | { kind: "empty" }
  | { kind: "expansion"; raw: string }
  | { kind: "expired"; row: TeslaRow }
  | { kind: "match"; row: TeslaRow }
  | { kind: "none"; raw: string; near: TeslaRow[] };

export function computeVerdict(raw: string): Verdict {
  const trimmed = raw.trim();
  const n = normalizeModel(trimmed);
  if (!n) return { kind: "empty" };

  if (/^1807000/.test(n)) return { kind: "expansion", raw: trimmed };

  const row = MODEL_INDEX[n];
  if (row?.expired) return { kind: "expired", row };
  if (row) return { kind: "match", row };

  const near = ROWS.filter((r) => {
    const rn = normalizeModel(r.m);
    return rn.includes(n) || n.includes(rn);
  }).slice(0, 5);
  return { kind: "none", raw: trimmed, near };
}

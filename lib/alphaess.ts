import type { BrandMeta } from "@/lib/brand-types";

export const BRAND: BrandMeta = {
  slug: "alphaess",
  label: "Alpha ESS",
  href: "/alphaess",
  manufacturer: "Alpha ESS",
  dataSource: "Alpha ESS rows of the CEC approved battery list",
};

export type AlphaRow = {
  /** Full CEC-approved model name, e.g. "SMILE-G3-BAT-9.3S III" */
  m: string;
  nom: number;
  use: number;
  ap: string;
  ex: string;
  /** Family key, matches a key of FAMS */
  f: string;
  /** Module count */
  n: number;
};

/**
 * 64 CEC rows across 15 Alpha ESS families. `build.py` (not part of this
 * app) drops any listing expired more than STALE_MONTHS before the build
 * date — as at this data's capture that already dropped `M4856-P`
 * (expired 3/09/2025) and `SMILE-BAT-10.3P` (expired 23/08/2025), so
 * neither appears here. Recently-expired rows (all six `SMILE-B3-PLUS`
 * listings, expired 19/08/2026) are kept and must stay searchable.
 */
export const STALE_MONTHS = 12;

export const ROWS: AlphaRow[] = [
  { m: "M38314-60SNW", nom: 60.25, use: 54.23, ap: "20/08/2026", ex: "31/12/2027", f: "stax", n: 5 },
  { m: "M38314-72SNW", nom: 72.3, use: 65.07, ap: "20/08/2026", ex: "31/12/2027", f: "stax", n: 6 },
  { m: "M38314-84SNW", nom: 84.35, use: 75.92, ap: "20/08/2026", ex: "31/12/2027", f: "stax", n: 7 },
  { m: "M38314-96SNW", nom: 96.4, use: 86.76, ap: "20/08/2026", ex: "31/12/2027", f: "stax", n: 8 },
  { m: "SMILE-B5 (AS4777-2 2020)", nom: 5.04, use: 4.79, ap: "5/03/2026", ex: "12/10/2027", f: "b5", n: 1 },
  { m: "SMILE-B5 II (AS4777-2 2020)", nom: 10.08, use: 9.58, ap: "5/03/2026", ex: "12/10/2027", f: "b5", n: 2 },
  { m: "SMILE-B5 III (AS4777-2 2020)", nom: 15.12, use: 14.36, ap: "5/03/2026", ex: "12/10/2027", f: "b5", n: 3 },
  { m: "SMILE-B5 IV (AS4777-2 2020)", nom: 20.16, use: 19.15, ap: "5/03/2026", ex: "12/10/2027", f: "b5", n: 4 },
  { m: "SMILE-B5 V (AS4777-2 2020)", nom: 25.2, use: 23.94, ap: "5/03/2026", ex: "12/10/2027", f: "b5", n: 5 },
  { m: "SMILE-B5 VI (AS4777-2 2020)", nom: 30.24, use: 28.73, ap: "5/03/2026", ex: "12/10/2027", f: "b5", n: 6 },
  { m: "SMILE-BAT-13.3P", nom: 13.34, use: 13.34, ap: "24/08/2023", ex: "24/02/2027", f: "bat133", n: 1 },
  { m: "SMILE-BAT-14P", nom: 13.99, use: 13.99, ap: "16/07/2026", ex: "31/12/2027", f: "bat14", n: 1 },
  { m: "SMILE-BAT-14P II", nom: 27.98, use: 27.98, ap: "16/07/2026", ex: "31/12/2027", f: "bat14", n: 2 },
  { m: "SMILE-BAT-14P III", nom: 41.97, use: 41.97, ap: "16/07/2026", ex: "31/12/2027", f: "bat14", n: 3 },
  { m: "SMILE-BAT-14P IV", nom: 55.96, use: 55.96, ap: "16/07/2026", ex: "31/12/2027", f: "bat14", n: 4 },
  { m: "SMILE-BAT-14P V", nom: 69.95, use: 69.95, ap: "16/07/2026", ex: "31/12/2027", f: "bat14", n: 5 },
  { m: "SMILE-BAT-15P", nom: 15.07, use: 15.07, ap: "16/07/2026", ex: "31/12/2027", f: "bat15", n: 1 },
  { m: "SMILE-BAT-15P II", nom: 30.14, use: 30.14, ap: "16/07/2026", ex: "31/12/2027", f: "bat15", n: 2 },
  { m: "SMILE-BAT-15P III", nom: 45.21, use: 45.21, ap: "16/07/2026", ex: "31/12/2027", f: "bat15", n: 3 },
  { m: "SMILE-BAT-15P IV", nom: 60.28, use: 60.28, ap: "16/07/2026", ex: "31/12/2027", f: "bat15", n: 4 },
  { m: "SMILE-BAT-15P V", nom: 75.36, use: 75.36, ap: "16/07/2026", ex: "31/12/2027", f: "bat15", n: 5 },
  { m: "SMILE-G3-BAT-4.0S", nom: 4.0, use: 3.8, ap: "22/04/2024", ex: "22/04/2027", f: "g340", n: 1 },
  { m: "SMILE-G3-BAT-9.3S", nom: 9.3, use: 9.3, ap: "17/11/2025", ex: "31/12/2027", f: "g393", n: 1 },
  { m: "SMILE-G3-BAT-9.3S II", nom: 18.6, use: 18.6, ap: "17/11/2025", ex: "31/12/2027", f: "g393", n: 2 },
  { m: "SMILE-G3-BAT-9.3S III", nom: 27.9, use: 27.9, ap: "17/11/2025", ex: "31/12/2027", f: "g393", n: 3 },
  { m: "SMILE-G3-BAT-9.3S IV", nom: 37.2, use: 37.2, ap: "17/11/2025", ex: "31/12/2027", f: "g393", n: 4 },
  { m: "SMILE-G3-BAT-9.3S V", nom: 46.5, use: 46.5, ap: "17/11/2025", ex: "31/12/2027", f: "g393", n: 5 },
  { m: "SMILE-G3-BAT-9.3S VI", nom: 55.8, use: 55.8, ap: "17/11/2025", ex: "31/12/2027", f: "g393", n: 6 },
  { m: "SMILE-M-BAT-13.9P", nom: 13.99, use: 13.99, ap: "24/07/2025", ex: "31/12/2027", f: "m139", n: 1 },
  { m: "SMILE-M-BAT-13.9P II", nom: 27.99, use: 27.99, ap: "24/07/2025", ex: "31/12/2027", f: "m139", n: 2 },
  { m: "SMILE-M-BAT-13.9P III", nom: 41.99, use: 41.99, ap: "24/07/2025", ex: "31/12/2027", f: "m139", n: 3 },
  { m: "SMILE-M-BAT-13.9P IV", nom: 55.99, use: 55.99, ap: "24/07/2025", ex: "31/12/2027", f: "m139", n: 4 },
  { m: "SMILE-M-BAT-5P", nom: 5.0, use: 5.0, ap: "17/06/2025", ex: "31/12/2027", f: "m5p", n: 1 },
  { m: "SMILE-M-BAT-5P II", nom: 10.0, use: 10.0, ap: "17/06/2025", ex: "31/12/2027", f: "m5p", n: 2 },
  { m: "SMILE-M-BAT-5P III", nom: 15.0, use: 15.0, ap: "17/06/2025", ex: "31/12/2027", f: "m5p", n: 3 },
  { m: "SMILE-M-BAT-5P IV", nom: 20.0, use: 20.0, ap: "17/06/2025", ex: "31/12/2027", f: "m5p", n: 4 },
  { m: "SMILE-M-BAT-5P V", nom: 25.0, use: 25.0, ap: "17/06/2025", ex: "31/12/2027", f: "m5p", n: 5 },
  { m: "SMILE-M-BAT-5P VI", nom: 30.0, use: 30.0, ap: "17/06/2025", ex: "31/12/2027", f: "m5p", n: 6 },
  { m: "SMILE-S5 (AS4777-2 2020)", nom: 5.04, use: 4.79, ap: "5/03/2026", ex: "12/10/2027", f: "s5", n: 1 },
  { m: "SMILE-S5 II (AS4777-2 2020)", nom: 10.08, use: 9.58, ap: "5/03/2026", ex: "12/10/2027", f: "s5", n: 2 },
  { m: "SMILE-S5 III (AS4777-2 2020)", nom: 15.12, use: 14.36, ap: "5/03/2026", ex: "12/10/2027", f: "s5", n: 3 },
  { m: "SMILE-S5 IV (AS4777-2 2020)", nom: 20.16, use: 19.15, ap: "5/03/2026", ex: "12/10/2027", f: "s5", n: 4 },
  { m: "SMILE-S5 V (AS4777-2 2020)", nom: 25.2, use: 23.94, ap: "5/03/2026", ex: "12/10/2027", f: "s5", n: 5 },
  { m: "SMILE-S5 VI (AS4777-2 2020)", nom: 30.24, use: 28.73, ap: "5/03/2026", ex: "12/10/2027", f: "s5", n: 6 },
  { m: "SMILE-B3-PLUS (AS4777-2 2020)", nom: 5.04, use: 4.79, ap: "22/01/2022", ex: "19/08/2026", f: "b3p", n: 1 },
  { m: "SMILE-B3-PLUS II (AS4777-2 2020)", nom: 10.08, use: 9.58, ap: "22/01/2022", ex: "19/08/2026", f: "b3p", n: 2 },
  { m: "SMILE-B3-PLUS III (AS4777-2 2020)", nom: 15.12, use: 14.36, ap: "22/01/2022", ex: "19/08/2026", f: "b3p", n: 3 },
  { m: "SMILE-B3-PLUS IV (AS4777-2 2020)", nom: 20.16, use: 19.15, ap: "22/01/2022", ex: "19/08/2026", f: "b3p", n: 4 },
  { m: "SMILE-B3-PLUS V (AS4777-2 2020)", nom: 25.2, use: 23.94, ap: "22/01/2022", ex: "19/08/2026", f: "b3p", n: 5 },
  { m: "SMILE-B3-PLUS VI (AS4777-2 2020)", nom: 30.24, use: 28.73, ap: "22/01/2022", ex: "19/08/2026", f: "b3p", n: 6 },
  { m: "SMILE-BAT-10.1P", nom: 10.08, use: 9.07, ap: "10/07/2022", ex: "31/12/2027", f: "bat101", n: 1 },
  { m: "SMILE-BAT-5P", nom: 5.04, use: 4.79, ap: "19/12/2022", ex: "31/12/2027", f: "bat5p", n: 1 },
  { m: "SMILE-BAT-8.2 PH", nom: 8.2, use: 7.8, ap: "30/09/2021", ex: "31/12/2027", f: "bat82", n: 1 },
  { m: "SMILE-BAT-8.2 PH II", nom: 16.4, use: 15.6, ap: "30/09/2021", ex: "31/12/2027", f: "bat82", n: 2 },
  { m: "SMILE-BAT-8.2 PH III", nom: 24.6, use: 23.4, ap: "30/09/2021", ex: "31/12/2027", f: "bat82", n: 3 },
  { m: "SMILE-BAT-8.2 PH IV", nom: 32.8, use: 31.2, ap: "30/09/2021", ex: "31/12/2027", f: "bat82", n: 4 },
  { m: "SMILE-BAT-8.2 PH V", nom: 41.0, use: 39.0, ap: "30/09/2021", ex: "31/12/2027", f: "bat82", n: 5 },
  { m: "SMILE-BAT-8.2 PH VI", nom: 49.2, use: 46.8, ap: "30/09/2021", ex: "31/12/2027", f: "bat82", n: 6 },
  { m: "SMILE-G3-BAT-10.1P", nom: 10.1, use: 9.6, ap: "22/08/2022", ex: "31/12/2027", f: "g3101", n: 1 },
  { m: "SMILE-G3-BAT-10.1P II", nom: 20.2, use: 19.2, ap: "22/08/2022", ex: "31/12/2027", f: "g3101", n: 2 },
  { m: "SMILE-G3-BAT-10.1P III", nom: 30.2, use: 28.7, ap: "22/08/2022", ex: "31/12/2027", f: "g3101", n: 3 },
  { m: "SMILE-G3-BAT-10.1P IV", nom: 40.3, use: 38.3, ap: "22/08/2022", ex: "31/12/2027", f: "g3101", n: 4 },
  { m: "SMILE-G3-BAT-10.1P V", nom: 50.4, use: 47.9, ap: "22/08/2022", ex: "31/12/2027", f: "g3101", n: 5 },
  { m: "SMILE-G3-BAT-10.1P VI", nom: 60.5, use: 57.5, ap: "22/08/2022", ex: "31/12/2027", f: "g3101", n: 6 },
];

const SUFFIX_RE = /\s*\(AS4777-2\s*2020\)\s*$/i;

export function normalizeModel(s: string): string {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Strips the AS4777 suffix only, keeping everything else. */
export function baseModel(m: string): string {
  return m.replace(SUFFIX_RE, "");
}

function parseDdMmYyyy(d: string): Date {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

/** "5/03/2026" -> "05/03/2026" */
export function formatDate(d: string): string {
  const [dd, mm, yyyy] = d.split("/");
  return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${yyyy}`;
}

export function formatKwh(v: number): string {
  return `${(Math.round(v * 100) / 100).toFixed(2).replace(/\.00$/, ".0")} kWh`;
}

/** Days until a row's CEC expiry, negative if already expired. Pass `today` explicitly — never cache this. */
export function daysLeft(row: AlphaRow, today: Date): number {
  return Math.round((parseDdMmYyyy(row.ex).getTime() - today.getTime()) / 86400000);
}

export function isExpired(row: AlphaRow, today: Date): boolean {
  return daysLeft(row, today) < 0;
}

export const EXPIRING_SOON_DAYS = 185;

export type ExpiryStatus =
  | { kind: "expired"; ap: string; ex: string }
  | { kind: "expiring-soon"; ex: string; days: number }
  | { kind: "current" };

export function expiryStatus(row: AlphaRow, today: Date): ExpiryStatus {
  const days = daysLeft(row, today);
  if (days < 0) return { kind: "expired", ap: row.ap, ex: row.ex };
  if (days <= EXPIRING_SOON_DAYS) return { kind: "expiring-soon", ex: row.ex, days };
  return { kind: "current" };
}

/** Resolves a model string to its live (non-expired) row, falling back to the first if all are expired. */
export function rowFor(model: string, today: Date): AlphaRow | undefined {
  const n = normalizeModel(model);
  const all = ROWS.filter((r) => normalizeModel(r.m) === n);
  if (!all.length) return undefined;
  const live = all.filter((r) => !isExpired(r, today));
  return live.length ? live[0] : all[0];
}

export type SystemKey = "smile5" | "g3" | "m5" | "t10hv" | "allinone" | "stax";

export type Family = {
  /** Display name, e.g. "SMILE-G3-BAT-9.3S" */
  n: string;
  /** Step-2 tile sub-label */
  sub: string;
  min: number;
  max: number;
  /** Per-module capacity label shown in the result panel */
  modcap: string;
  sys: SystemKey;
  /** Module count -> full CEC model string */
  models: Record<number, string>;
  note: string;
  /** True when every listing in this family has expired (SMILE-B3-PLUS) */
  exp: boolean;
};

export const FAMS: Record<string, Family> = {
  s5: {
    n: "SMILE-S5",
    sub: "5.04 kWh module",
    min: 1,
    max: 6,
    modcap: "5.04 kWh nominal / 4.79 kWh usable",
    sys: "allinone",
    models: { 1: "SMILE-S5 (AS4777-2 2020)", 2: "SMILE-S5 II (AS4777-2 2020)", 3: "SMILE-S5 III (AS4777-2 2020)", 4: "SMILE-S5 IV (AS4777-2 2020)", 5: "SMILE-S5 V (AS4777-2 2020)", 6: "SMILE-S5 VI (AS4777-2 2020)" },
    note: "Identical capacities to the SMILE-B5 and the SMILE-B3-PLUS. The model name on the nameplate is the only way to tell them apart.",
    exp: false,
  },
  b5: {
    n: "SMILE-B5",
    sub: "5.04 kWh module",
    min: 1,
    max: 6,
    modcap: "5.04 kWh nominal / 4.79 kWh usable",
    sys: "allinone",
    models: { 1: "SMILE-B5 (AS4777-2 2020)", 2: "SMILE-B5 II (AS4777-2 2020)", 3: "SMILE-B5 III (AS4777-2 2020)", 4: "SMILE-B5 IV (AS4777-2 2020)", 5: "SMILE-B5 V (AS4777-2 2020)", 6: "SMILE-B5 VI (AS4777-2 2020)" },
    note: "Identical capacities to the SMILE-S5 and the SMILE-B3-PLUS. The model name on the nameplate is the only way to tell them apart.",
    exp: false,
  },
  b3p: {
    n: "SMILE-B3-PLUS",
    sub: "expired listing",
    min: 1,
    max: 6,
    modcap: "5.04 kWh nominal / 4.79 kWh usable",
    sys: "allinone",
    models: { 1: "SMILE-B3-PLUS (AS4777-2 2020)", 2: "SMILE-B3-PLUS II (AS4777-2 2020)", 3: "SMILE-B3-PLUS III (AS4777-2 2020)", 4: "SMILE-B3-PLUS IV (AS4777-2 2020)", 5: "SMILE-B3-PLUS V (AS4777-2 2020)", 6: "SMILE-B3-PLUS VI (AS4777-2 2020)" },
    note: "Identical capacities to the SMILE-S5 and the SMILE-B5.",
    exp: true,
  },
  bat5p: {
    n: "SMILE-BAT-5P",
    sub: "5.04 kWh",
    min: 1,
    max: 1,
    modcap: "5.04 kWh nominal / 4.79 kWh usable",
    sys: "smile5",
    models: { 1: "SMILE-BAT-5P" },
    note: "Only the single module is CEC listed, although the hardware supports up to six in parallel. If more than one is installed, check how the installer recorded it.",
    exp: false,
  },
  bat101: {
    n: "SMILE-BAT-10.1P",
    sub: "10.08 kWh",
    min: 1,
    max: 1,
    modcap: "10.08 kWh nominal / 9.07 kWh usable",
    sys: "smile5",
    models: { 1: "SMILE-BAT-10.1P" },
    note: "Not the same model as the SMILE-G3-BAT-10.1P, which has a different usable capacity. Only the single module is CEC listed.",
    exp: false,
  },
  bat133: {
    n: "SMILE-BAT-13.3P",
    sub: "13.34 kWh",
    min: 1,
    max: 1,
    modcap: "13.34 kWh",
    sys: "smile5",
    models: { 1: "SMILE-BAT-13.3P" },
    note: "Only the single module is CEC listed, although the hardware supports up to six in parallel with an expansion pack.",
    exp: false,
  },
  bat14: {
    n: "SMILE-BAT-14P",
    sub: "13.99 kWh",
    min: 1,
    max: 5,
    modcap: "13.99 kWh",
    sys: "smile5",
    models: { 1: "SMILE-BAT-14P", 2: "SMILE-BAT-14P II", 3: "SMILE-BAT-14P III", 4: "SMILE-BAT-14P IV", 5: "SMILE-BAT-14P V" },
    note: "Understood to be the same 13.99 kWh hardware as the SMILE-M-BAT-13.9P, listed separately for this inverter family. Installers often call it the “14 kWh” battery.",
    exp: false,
  },
  bat15: {
    n: "SMILE-BAT-15P",
    sub: "15.07 kWh",
    min: 1,
    max: 5,
    modcap: "15.07 kWh",
    sys: "smile5",
    models: { 1: "SMILE-BAT-15P", 2: "SMILE-BAT-15P II", 3: "SMILE-BAT-15P III", 4: "SMILE-BAT-15P IV", 5: "SMILE-BAT-15P V" },
    note: "",
    exp: false,
  },
  g340: {
    n: "SMILE-G3-BAT-4.0S",
    sub: "4.0 kWh",
    min: 1,
    max: 1,
    modcap: "4.00 kWh nominal / 3.80 kWh usable",
    sys: "g3",
    models: { 1: "SMILE-G3-BAT-4.0S" },
    note: "Only the single module is CEC listed, although the datasheet allows up to six in series.",
    exp: false,
  },
  g393: {
    n: "SMILE-G3-BAT-9.3S",
    sub: "9.3 kWh",
    min: 1,
    max: 6,
    modcap: "9.30 kWh",
    sys: "g3",
    models: { 1: "SMILE-G3-BAT-9.3S", 2: "SMILE-G3-BAT-9.3S II", 3: "SMILE-G3-BAT-9.3S III", 4: "SMILE-G3-BAT-9.3S IV", 5: "SMILE-G3-BAT-9.3S V", 6: "SMILE-G3-BAT-9.3S VI" },
    note: "Five and six modules require a three-phase SMILE-G3-T inverter. A single-phase SMILE-G3-S5 or G3-B5 takes a maximum of four.",
    exp: false,
  },
  g3101: {
    n: "SMILE-G3-BAT-10.1P",
    sub: "10.1 kWh",
    min: 1,
    max: 6,
    modcap: "10.10 kWh nominal / 9.60 kWh usable",
    sys: "g3",
    models: { 1: "SMILE-G3-BAT-10.1P", 2: "SMILE-G3-BAT-10.1P II", 3: "SMILE-G3-BAT-10.1P III", 4: "SMILE-G3-BAT-10.1P IV", 5: "SMILE-G3-BAT-10.1P V", 6: "SMILE-G3-BAT-10.1P VI" },
    note: "Not the same model as the SMILE-BAT-10.1P, which has a different usable capacity.",
    exp: false,
  },
  m5p: {
    n: "SMILE-M-BAT-5P",
    sub: "5.0 kWh",
    min: 1,
    max: 6,
    modcap: "5.00 kWh",
    sys: "m5",
    models: { 1: "SMILE-M-BAT-5P", 2: "SMILE-M-BAT-5P II", 3: "SMILE-M-BAT-5P III", 4: "SMILE-M-BAT-5P IV", 5: "SMILE-M-BAT-5P V", 6: "SMILE-M-BAT-5P VI" },
    note: "",
    exp: false,
  },
  m139: {
    n: "SMILE-M-BAT-13.9P",
    sub: "13.99 kWh",
    min: 1,
    max: 4,
    modcap: "13.99 kWh",
    sys: "m5",
    models: { 1: "SMILE-M-BAT-13.9P", 2: "SMILE-M-BAT-13.9P II", 3: "SMILE-M-BAT-13.9P III", 4: "SMILE-M-BAT-13.9P IV" },
    note: "Alpha ESS publishes a maximum of two modules for this battery, but the CEC lists four sizes. Confirm the module count against the commissioning paperwork.",
    exp: false,
  },
  bat82: {
    n: "SMILE-BAT-8.2 PH",
    sub: "8.2 kWh",
    min: 1,
    max: 6,
    modcap: "8.20 kWh nominal / 7.80 kWh usable",
    sys: "t10hv",
    models: { 1: "SMILE-BAT-8.2 PH", 2: "SMILE-BAT-8.2 PH II", 3: "SMILE-BAT-8.2 PH III", 4: "SMILE-BAT-8.2 PH IV", 5: "SMILE-BAT-8.2 PH V", 6: "SMILE-BAT-8.2 PH VI" },
    note: "",
    exp: false,
  },
  stax: {
    n: "StaX M38314",
    sub: "12.05 kWh module",
    min: 5,
    max: 8,
    modcap: "12.05 kWh nominal / 10.85 kWh usable",
    sys: "stax",
    models: { 5: "M38314-60SNW", 6: "M38314-72SNW", 7: "M38314-84SNW", 8: "M38314-96SNW" },
    note: "Only five to eight modules are CEC approved. The hardware scales to eighteen, so a larger StaX has no approved model number. Do not count modules from the outside — the panels are doors, not module faces. Use the nameplate or the commissioning report.",
    exp: false,
  },
};

export type Img = { src: string; cap: string; w: number; h: number };

export type System = {
  k: SystemKey;
  n: string;
  sub: string;
  desc: string;
  /** May contain a single inline <b> span — see tellSegments(). */
  tell: string;
  imgs: Img[];
};

export const SYS: System[] = [
  {
    k: "smile5",
    n: "SMILE5",
    sub: "Single phase · 5 kW",
    desc: "A tall, narrow wall inverter with the battery modules stacked beneath or beside it. This is the longest-running Alpha ESS line, so it covers the widest spread of batteries — and the most discontinued ones that still appear on old paperwork.",
    tell: "The inverter is a separate upright unit with a black vertical strip down its right-hand side and a small LCD. The battery is a plain white box of similar width sitting directly below it.",
    imgs: [
      { src: "/alphaess/smile5-photo.jpg", cap: "Installation photo — SMILE5 inverter above a SMILE-BAT-13.3P.", w: 465, h: 620 },
      { src: "/alphaess/smile5-render.png", cap: "Manufacturer illustration — the same pairing.", w: 292, h: 560 },
    ],
  },
  {
    k: "g3",
    n: "SMILE-G3",
    sub: "Single or three phase · 5–20 kW",
    desc: "The current generation. Single-phase G3-S5 and G3-B5 inverters take up to four battery modules; three-phase G3-T models take up to six on the CEC list.",
    tell: "A dark charcoal spine runs down the <b>left</b> side of the whole stack, with white module faces to the right of it. The inverter sits on top and carries the Alpha ESS logo.",
    imgs: [
      { src: "/alphaess/g3-photo.jpg", cap: "Installation photo — SMILE-G3 stack with a second battery alongside.", w: 465, h: 620 },
      { src: "/alphaess/g3-render.png", cap: "Manufacturer illustration — SMILE-G3-BAT-10.1P module.", w: 453, h: 400 },
    ],
  },
  {
    k: "m5",
    n: "SMILE-M5 / M10",
    sub: "Single phase · 5–10 kW",
    desc: "The newest residential line, sold as an all-in-one stack. The inverter and the battery modules bolt together into one tower standing on adjustable feet.",
    tell: "The only Alpha ESS that reads as a proper stacked tower — clear horizontal seams between equal-height trays, with visible feet at the base. Comes in a 5 kWh tray and a much taller 13.99 kWh tray.",
    imgs: [{ src: "/alphaess/m5-render.png", cap: "Manufacturer illustration — SMILE-M5 with 5 kWh modules.", w: 303, h: 560 }],
  },
  {
    k: "t10hv",
    n: "SMILE-T10-HV",
    sub: "Three phase · 10 kW",
    desc: "A three-phase system using the outdoor-rated 8.2 kWh battery. One battery family only.",
    tell: "The battery is the most distinctive in the range — a tall cabinet with a sculpted, tapered top edge and a vertical <b>green LED strip</b> on the front. Nothing else in the Alpha ESS line looks like it.",
    imgs: [{ src: "/alphaess/t10hv-render.png", cap: "Manufacturer illustration — SMILE-BAT-8.2 PH.", w: 458, h: 560 }],
  },
  {
    k: "allinone",
    n: "SMILE-S5 / B5",
    sub: "Single phase · 5 kW · all-in-one",
    desc: "Inverter and battery in a single wall-mounted cabinet, with further modules added below. The S5 is the hybrid for new solar; the B5 is the AC-coupled version added to existing solar. The discontinued B3-PLUS belongs to the same family.",
    tell: "There is <b>no separate inverter on the wall</b> — one slim cabinet does both jobs. A black vertical strip runs down the middle of the front face.",
    imgs: [{ src: "/alphaess/allinone-render.png", cap: "Manufacturer illustration — SMILE-S5 / B5 all-in-one.", w: 427, h: 485 }],
  },
  {
    k: "stax",
    n: "StaX M30 / M50",
    sub: "Three phase · 30–50 kW · commercial",
    desc: "Commercial scale. A large floor-standing cabinet holding two side-by-side columns of modules, with a separate wall-mounted inverter. Only four sizes are CEC approved.",
    tell: "Much bigger than anything residential, and the only Alpha ESS cabinet with a <b>vertical seam down the middle</b> splitting each tier into two doors. A small LCD sits in the top right.",
    imgs: [{ src: "/alphaess/stax-photo.jpg", cap: "Installation photo — StaX cabinet with its inverter alongside.", w: 620, h: 620 }],
  },
];

export const SYS_BY_KEY: Record<SystemKey, System> = Object.fromEntries(SYS.map((s) => [s.k, s])) as Record<SystemKey, System>;

/** Family ids that pair with a given inverter system, in FAMS' declared order. */
export function famsFor(sysKey: SystemKey): string[] {
  return Object.keys(FAMS).filter((k) => FAMS[k].sys === sysKey);
}

export type Brick = { kind: "inverter" | "module"; label: string };

/** No inverter brick for StaX (its inverter is wall-mounted, separate from the cabinet). */
export function stackBricks(fam: Family, n: number): Brick[] {
  const bricks: Brick[] = [];
  if (fam.sys === "allinone") bricks.push({ kind: "inverter", label: "inverter built in" });
  else if (fam.sys !== "stax") bricks.push({ kind: "inverter", label: "inverter" });
  for (let i = 0; i < n; i++) bricks.push({ kind: "module", label: "module" });
  return bricks;
}

export type BuildNote =
  | { kind: "expired"; ap: string; ex: string }
  | { kind: "expiring-soon"; ex: string; days: number }
  | { kind: "family"; text: string };

export type BuildResult = {
  sysKey: SystemKey;
  famId: string;
  fam: Family;
  n: number;
  /** False once a family's min===max, hiding step 3 */
  stepperVisible: boolean;
  model: string | undefined;
  row: AlphaRow | undefined;
  bricks: Brick[];
  notes: BuildNote[];
};

export function computeBuild(sysKey: SystemKey, famId: string, requestedN: number, today: Date): BuildResult {
  const fam = FAMS[famId];
  const n = Math.min(Math.max(requestedN, fam.min), fam.max);
  const model = fam.models[n];
  const row = model ? rowFor(model, today) : undefined;

  const notes: BuildNote[] = [];
  if (row) {
    const status = expiryStatus(row, today);
    if (status.kind === "expired") notes.push({ kind: "expired", ap: status.ap, ex: status.ex });
    else if (status.kind === "expiring-soon") notes.push({ kind: "expiring-soon", ex: status.ex, days: status.days });
  }
  if (fam.note) notes.push({ kind: "family", text: fam.note });

  return {
    sysKey,
    famId,
    fam,
    n,
    stepperVisible: fam.min !== fam.max,
    model,
    row,
    bricks: stackBricks(fam, n),
    notes,
  };
}

export type Verdict =
  | { kind: "empty" }
  | {
      kind: "match";
      row: AlphaRow;
      fam: Family | null;
      sys: System | null;
      status: ExpiryStatus;
    }
  | { kind: "none"; raw: string; near: AlphaRow[] };

export function famOf(row: AlphaRow): Family | null {
  return FAMS[row.f] ?? null;
}

export function computeVerdict(raw: string, today: Date): Verdict {
  const trimmed = raw.trim();
  if (!trimmed) return { kind: "empty" };

  const nq = normalizeModel(trimmed);
  const hits = ROWS.filter((r) => normalizeModel(r.m) === nq || normalizeModel(baseModel(r.m)) === nq);

  if (hits.length) {
    const live = hits.filter((r) => !isExpired(r, today));
    const row = live.length ? live[0] : hits[0];
    const fam = famOf(row);
    const sys = fam ? SYS_BY_KEY[fam.sys] : null;
    return { kind: "match", row, fam, sys, status: expiryStatus(row, today) };
  }

  const prefix = nq.slice(0, 6);
  const near = ROWS.filter((r) => {
    const rn = normalizeModel(baseModel(r.m));
    return rn.startsWith(prefix) || nq.startsWith(rn.slice(0, 6));
  }).slice(0, 5);
  return { kind: "none", raw: trimmed, near };
}

export type AccordionPill = { tone: "stop" | "warn" | "ok"; label: string };

/** The soonest-expiring live listing across a system's families drives its accordion pill. */
export function accordionPill(sysKey: SystemKey, today: Date): AccordionPill {
  const live = ROWS.filter((r) => FAMS[r.f]?.sys === sysKey && !isExpired(r, today));
  if (!live.length) return { tone: "stop", label: "All listings expired" };
  const minDays = Math.min(...live.map((r) => daysLeft(r, today)));
  if (minDays <= EXPIRING_SOON_DAYS) return { tone: "warn", label: `Expires in ${minDays} days` };
  return { tone: "ok", label: "Current" };
}

export type AccordionBatteryRow = {
  famId: string;
  fam: Family;
  moduleRangeLabel: string;
  totalRangeLabel: string;
};

export function accordionBatteryRows(sysKey: SystemKey, today: Date): AccordionBatteryRow[] {
  return famsFor(sysKey).map((famId) => {
    const fam = FAMS[famId];
    const lo = rowFor(fam.models[fam.min], today);
    const hi = rowFor(fam.models[fam.max], today);
    const totalRangeLabel = lo ? (fam.min === fam.max ? formatKwh(lo.nom) : `${formatKwh(lo.nom)} – ${hi ? formatKwh(hi.nom) : "—"}`) : "—";
    const moduleRangeLabel = fam.min === fam.max ? String(fam.min) : `${fam.min}–${fam.max}`;
    return { famId, fam, moduleRangeLabel, totalRangeLabel };
  });
}

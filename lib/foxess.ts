import type { BrandMeta } from "@/lib/brand-types";

export const BRAND: BrandMeta = {
  slug: "foxess",
  label: "FoxESS",
  href: "/foxess",
  manufacturer: "FoxESS",
  dataSource: "FoxESS rows of the CEC approved battery list",
};

export type FoxRow = {
  /** Full CEC-approved model name, e.g. "CQ6-L5" */
  m: string;
  /** Series/manufacturer label as listed on the CEC register */
  s: string;
  nom: number;
  use: number;
  ap: string;
  ex: string;
};

/**
 * FoxESS rows of the CEC approved battery list — 116 rows, 78 current and
 * 38 expired (all AIO-H1/AIO-AC1 and all CQ7-50-*). Both sets stay in the
 * data; only the finder's "From the photos" tab excludes the expired ones
 * (they were never reachable through SERIES/FF_SERIES below). "Check a
 * model number" matches against every row here, flagging expired ones.
 */
export const ROWS: FoxRow[] = [
  { m: "1K5-BAT-4660-L2", s: "1K5-BAT-4660", nom: 9.32, use: 9.32, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L3", s: "1K5-BAT-4660", nom: 13.98, use: 13.98, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L4", s: "1K5-BAT-4660", nom: 18.64, use: 18.64, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L5", s: "1K5-BAT-4660", nom: 23.3, use: 23.3, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L6", s: "1K5-BAT-4660", nom: 27.96, use: 27.96, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L7", s: "1K5-BAT-4660", nom: 32.61, use: 32.61, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L8", s: "1K5-BAT-4660", nom: 37.27, use: 37.27, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "1K5-BAT-4660-L9", s: "1K5-BAT-4660", nom: 41.93, use: 41.93, ap: "8/05/2025", ex: "31/12/2027" },
  { m: "AIO-AC1-5.0-HVS10.4 (AS4777-2 2020)", s: "AIO-AC1", nom: 10.4, use: 9.36, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-AC1-5.0-HVS5.2 (AS4777-2 2020)", s: "AIO-AC1", nom: 5.2, use: 4.68, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-AC1-5.0-HVS7.8 (AS4777-2 2020)", s: "AIO-AC1", nom: 7.8, use: 7.02, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-AC1-6.0-HVS10.4 (AS4777-2 2020)", s: "AIO-AC1", nom: 10.4, use: 9.36, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-AC1-6.0-HVS5.2 (AS4777-2 2020)", s: "AIO-AC1", nom: 5.2, use: 4.68, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-AC1-6.0-HVS7.8 (AS4777-2 2020)", s: "AIO-AC1", nom: 7.8, use: 7.02, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-H1-5.0-HVS10.4 (AS4777-2 2020)", s: "AIO-H1", nom: 10.4, use: 9.36, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-H1-5.0-HVS5.2 (AS4777-2 2020)", s: "AIO-H1", nom: 5.2, use: 4.68, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-H1-5.0-HVS7.8 (AS4777-2 2020)", s: "AIO-H1", nom: 7.8, use: 7.02, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-H1-6.0-HVS10.4 (AS4777-2 2020)", s: "AIO-H1", nom: 10.4, use: 9.36, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-H1-6.0-HVS5.2 (AS4777-2 2020)", s: "AIO-H1", nom: 5.2, use: 4.68, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "AIO-H1-6.0-HVS7.8 (AS4777-2 2020)", s: "AIO-H1", nom: 7.8, use: 7.02, ap: "21/12/2022", ex: "21/12/2025" },
  { m: "CQ6-L10", s: "CQ6", nom: 59.9, use: 59.9, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L11", s: "CQ6", nom: 65.89, use: 65.89, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L12", s: "CQ6", nom: 71.88, use: 71.88, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L13", s: "CQ6", nom: 77.87, use: 77.87, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L14", s: "CQ6", nom: 83.86, use: 83.86, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L2", s: "CQ6", nom: 11.98, use: 11.98, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L3", s: "CQ6", nom: 17.97, use: 17.97, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L4", s: "CQ6", nom: 23.96, use: 23.96, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L5", s: "CQ6", nom: 29.95, use: 29.95, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L6", s: "CQ6", nom: 35.94, use: 35.94, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L7", s: "CQ6", nom: 41.93, use: 41.93, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L8", s: "CQ6", nom: 47.92, use: 47.92, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ6-L9", s: "CQ6", nom: 53.91, use: 53.91, ap: "5/12/2025", ex: "31/12/2027" },
  { m: "CQ7-50-L10", s: "CQ7", nom: 69.6, use: 69.6, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L10 (w)", s: "CQ7", nom: 69.6, use: 69.6, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L11", s: "CQ7", nom: 76.56, use: 76.56, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L11 (w)", s: "CQ7", nom: 76.56, use: 76.56, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L12", s: "CQ7", nom: 83.52, use: 83.52, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L12 (w)", s: "CQ7", nom: 83.52, use: 83.52, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L13", s: "CQ7", nom: 90.48, use: 90.48, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L13 (w)", s: "CQ7", nom: 90.48, use: 90.48, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L14", s: "CQ7", nom: 97.44, use: 97.44, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L14 (w)", s: "CQ7", nom: 97.44, use: 97.44, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L2", s: "CQ7", nom: 13.92, use: 13.92, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L2 (w)", s: "CQ7", nom: 13.92, use: 13.92, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L3", s: "CQ7", nom: 20.88, use: 20.88, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L3 (w)", s: "CQ7", nom: 20.88, use: 20.88, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L4", s: "CQ7", nom: 27.84, use: 27.84, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L4 (w)", s: "CQ7", nom: 27.84, use: 27.84, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L5", s: "CQ7", nom: 34.8, use: 34.8, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L5 (w)", s: "CQ7", nom: 34.8, use: 34.8, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L6", s: "CQ7", nom: 41.76, use: 41.76, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L6 (w)", s: "CQ7", nom: 41.76, use: 41.76, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L7", s: "CQ7", nom: 48.72, use: 48.72, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L7 (w)", s: "CQ7", nom: 48.72, use: 48.72, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L8", s: "CQ7", nom: 55.68, use: 55.68, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L8 (w)", s: "CQ7", nom: 55.68, use: 55.68, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L9", s: "CQ7", nom: 62.64, use: 62.64, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-50-L9 (w)", s: "CQ7", nom: 62.64, use: 62.64, ap: "18/05/2026", ex: "30/06/2026" },
  { m: "CQ7-L10", s: "CQ7", nom: 69.6, use: 69.6, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L10 (w)", s: "CQ7", nom: 69.6, use: 69.6, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L11", s: "CQ7", nom: 76.56, use: 76.56, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L11 (w)", s: "CQ7", nom: 76.56, use: 76.56, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L12", s: "CQ7", nom: 83.52, use: 83.52, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L12 (w)", s: "CQ7", nom: 83.52, use: 83.52, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L13", s: "CQ7", nom: 90.48, use: 90.48, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L13 (w)", s: "CQ7", nom: 90.48, use: 90.48, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L14", s: "CQ7", nom: 97.44, use: 97.44, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L14 (w)", s: "CQ7", nom: 97.44, use: 97.44, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L2", s: "CQ7", nom: 13.92, use: 13.92, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L2 (w)", s: "CQ7", nom: 13.92, use: 13.92, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L3", s: "CQ7", nom: 20.88, use: 20.88, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L3 (w)", s: "CQ7", nom: 20.88, use: 20.88, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L4", s: "CQ7", nom: 27.84, use: 27.84, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L4 (w)", s: "CQ7", nom: 27.84, use: 27.84, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L5", s: "CQ7", nom: 34.8, use: 34.8, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L5 (w)", s: "CQ7", nom: 34.8, use: 34.8, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L6", s: "CQ7", nom: 41.76, use: 41.76, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L6 (w)", s: "CQ7", nom: 41.76, use: 41.76, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L7", s: "CQ7", nom: 48.72, use: 48.72, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L7 (w)", s: "CQ7", nom: 48.72, use: 48.72, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L8", s: "CQ7", nom: 55.68, use: 55.68, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L8 (w)", s: "CQ7", nom: 55.68, use: 55.68, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L9", s: "CQ7", nom: 62.64, use: 62.64, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "CQ7-L9 (w)", s: "CQ7", nom: 62.64, use: 62.64, ap: "18/05/2026", ex: "31/12/2027" },
  { m: "ECS2900-H2", s: "ECS2900", nom: 5.76, use: 5.18, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS2900-H3", s: "ECS2900", nom: 8.64, use: 7.78, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS2900-H4", s: "ECS2900", nom: 11.52, use: 10.37, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS2900-H5", s: "ECS2900", nom: 14.4, use: 12.96, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS2900-H6", s: "ECS2900", nom: 17.28, use: 15.55, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS2900-H7", s: "ECS2900", nom: 20.16, use: 18.14, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS4800-H2", s: "ECS4800", nom: 9.32, use: 8.39, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS4800-H3", s: "ECS4800", nom: 13.98, use: 12.58, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS4800-H4", s: "ECS4800", nom: 18.64, use: 16.78, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS4800-H5", s: "ECS4800", nom: 23.3, use: 20.97, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS4800-H6", s: "ECS4800", nom: 27.96, use: 25.16, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "ECS4800-H7", s: "ECS4800", nom: 32.6, use: 29.35, ap: "2/01/2024", ex: "2/01/2027" },
  { m: "EP11", s: "EP", nom: 10.36, use: 10.36, ap: "6/06/2024", ex: "6/06/2027" },
  { m: "EP12 Plus (w)", s: "EP12 Plus (w)", nom: 11.52, use: 11.52, ap: "15/06/2026", ex: "31/12/2027" },
  { m: "EP5", s: "EP", nom: 5.18, use: 4.67, ap: "6/06/2024", ex: "6/06/2027" },
  { m: "EQ4800-L2", s: "EQ4800", nom: 9.32, use: 9.32, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L3", s: "EQ4800", nom: 13.98, use: 13.98, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L4", s: "EQ4800", nom: 18.64, use: 18.64, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L5", s: "EQ4800", nom: 23.3, use: 23.3, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L6", s: "EQ4800", nom: 27.96, use: 27.96, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L7", s: "EQ4800", nom: 32.61, use: 32.61, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L8", s: "EQ4800", nom: 37.27, use: 37.27, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ4800-L9", s: "EQ4800", nom: 41.93, use: 41.93, ap: "14/11/2024", ex: "14/11/2027" },
  { m: "EQ5500-L2", s: "EQ5500 series", nom: 10.92, use: 10.92, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L3", s: "EQ5500 series", nom: 16.38, use: 16.38, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L4", s: "EQ5500 series", nom: 21.84, use: 21.84, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L5", s: "EQ5500 series", nom: 27.3, use: 27.3, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L6", s: "EQ5500 series", nom: 32.76, use: 32.76, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L7", s: "EQ5500 series", nom: 38.22, use: 38.22, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L8", s: "EQ5500 series", nom: 43.68, use: 43.68, ap: "16/06/2026", ex: "31/12/2027" },
  { m: "EQ5500-L9", s: "EQ5500 series", nom: 49.14, use: 49.14, ap: "16/06/2026", ex: "31/12/2027" },
];

const SUFFIX_RE = /\s*\(AS4777-2\s*2020\)\s*$/i;

export function normalizeModel(s: string): string {
  return String(s).toLowerCase().replace(SUFFIX_RE, "").replace(/[^a-z0-9.]/g, "");
}

/** Strips the AS4777 suffix only, keeping everything else (incl. "(w)"). */
export function baseModel(m: string): string {
  return m.replace(SUFFIX_RE, "");
}

export const INDEX: Record<string, FoxRow> = Object.fromEntries(
  ROWS.map((r) => [normalizeModel(r.m), r])
);

function parseDdMmYyyy(d: string): Date {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

/** Days until a row's CEC expiry, negative if already expired. Pass `today` explicitly — never cache this. */
export function daysLeft(row: FoxRow, today: Date): number {
  return Math.round((parseDdMmYyyy(row.ex).getTime() - today.getTime()) / 86400000);
}

export function isExpired(row: FoxRow, today: Date): boolean {
  return daysLeft(row, today) < 0;
}

export const EXPIRING_SOON_DAYS = 185;

export type ExpiryStatus =
  | { kind: "expired"; ap: string; ex: string }
  | { kind: "expiring-soon"; ex: string; days: number }
  | { kind: "current" };

export function expiryStatus(row: FoxRow, today: Date): ExpiryStatus {
  const days = daysLeft(row, today);
  if (days < 0) return { kind: "expired", ap: row.ap, ex: row.ex };
  if (days < EXPIRING_SOON_DAYS) return { kind: "expiring-soon", ex: row.ex, days };
  return { kind: "current" };
}

export type PhotoKey = "EP5" | "EP11" | "EP12";

export type TowerSeries = {
  id: string;
  ff: "tower";
  /** Display name */
  name: string;
  /** Matches FoxRow.s for this series' rows */
  csv: string;
  /** Master module label, printed on the nameplate */
  m: string;
  /** Slave module label, printed on the nameplate */
  s: string;
  /** Usable capacity per module, kWh */
  kwh: number;
  min: number;
  max: number;
  fmt: (n: number) => string;
};

export type WallSeries = {
  id: string;
  ff: "wall";
  /** Display name */
  name: string;
  /** Full CEC model string */
  model: string;
  photo: PhotoKey;
};

export type FoxSeries = TowerSeries | WallSeries;

/**
 * Selectable series for the "From the photos" tab — deliberately excludes
 * AIO-H1, AIO-AC1 and CQ7-50 (all 38 expired rows), which are reachable
 * only through "Check a model number".
 */
export const SERIES: Record<string, FoxSeries> = {
  CQ6: { id: "CQ6", ff: "tower", name: "CQ6", csv: "CQ6", m: "CQ6-M", s: "CQ6-S", kwh: 5.99, min: 2, max: 14, fmt: (n) => `CQ6-L${n}` },
  CQ7: { id: "CQ7", ff: "tower", name: "CQ7", csv: "CQ7", m: "CQ7-M", s: "CQ7-S", kwh: 6.96, min: 2, max: 14, fmt: (n) => `CQ7-L${n}` },
  EQ4800: { id: "EQ4800", ff: "tower", name: "EQ4800", csv: "EQ4800", m: "EQ4800-M", s: "EQ4800-S", kwh: 4.66, min: 2, max: 9, fmt: (n) => `EQ4800-L${n}` },
  EQ5500: { id: "EQ5500", ff: "tower", name: "EQ5500", csv: "EQ5500 series", m: "EQ5500-M", s: "EQ5500-S", kwh: 5.46, min: 2, max: 9, fmt: (n) => `EQ5500-L${n}` },
  "1K5": { id: "1K5", ff: "tower", name: "1K5-BAT-4660", csv: "1K5-BAT-4660", m: "1K5-BAT-M-4660", s: "1K5-BAT-S-4660", kwh: 4.66, min: 2, max: 9, fmt: (n) => `1K5-BAT-4660-L${n}` },
  ECS2900: { id: "ECS2900", ff: "tower", name: "ECS2900", csv: "ECS2900", m: "CM2900", s: "CS2900", kwh: 2.88, min: 2, max: 7, fmt: (n) => `ECS2900-H${n}` },
  ECS4800: { id: "ECS4800", ff: "tower", name: "ECS4800", csv: "ECS4800", m: "CM4800", s: "CS4800", kwh: 4.66, min: 2, max: 7, fmt: (n) => `ECS4800-H${n}` },
  EP5: { id: "EP5", ff: "wall", name: "EP5", model: "EP5", photo: "EP5" },
  EP11: { id: "EP11", ff: "wall", name: "EP11", model: "EP11", photo: "EP11" },
  EP12: { id: "EP12", ff: "wall", name: "EP12 Plus", model: "EP12 Plus (w)", photo: "EP12" },
};

export type FormFactor = "tower" | "wall";

export const FF_SERIES: Record<FormFactor, string[]> = {
  tower: ["CQ6", "CQ7", "EQ4800", "EQ5500", "1K5", "ECS2900", "ECS4800"],
  wall: ["EP5", "EP11", "EP12"],
};

export type Brick = { kind: "m" | "s"; label: string };

export function stackBricks(series: TowerSeries, n: number): Brick[] {
  const bricks: Brick[] = [{ kind: "m", label: series.m }];
  for (let i = 1; i < n; i++) bricks.push({ kind: "s", label: series.s });
  return bricks;
}

export type BuildNotes = {
  expiry: ExpiryStatus | null;
  rebrand: boolean;
  ecs4800: boolean;
  cq7: { model: string } | null;
  ep12: boolean;
};

export type TowerBuildResult = {
  ff: "tower";
  series: TowerSeries;
  n: number;
  model: string;
  row: FoxRow | undefined;
  bricks: Brick[];
  notes: BuildNotes;
};

export type WallBuildResult = {
  ff: "wall";
  series: WallSeries;
  model: string;
  row: FoxRow | undefined;
  notes: BuildNotes;
};

export type BuildResult = TowerBuildResult | WallBuildResult;

function buildNotes(seriesId: string, model: string, row: FoxRow | undefined, today: Date): BuildNotes {
  return {
    expiry: row ? expiryStatus(row, today) : null,
    rebrand: seriesId === "1K5" || seriesId === "EQ4800",
    ecs4800: seriesId === "ECS4800",
    cq7: seriesId === "CQ7" ? { model } : null,
    ep12: seriesId === "EP12",
  };
}

export function computeBuild(ff: FormFactor, seriesId: string, n: number, today: Date): BuildResult {
  const series = SERIES[seriesId];

  if (series.ff === "wall") {
    const model = series.model;
    const row = INDEX[normalizeModel(model)];
    return { ff: "wall", series, model, row, notes: buildNotes(seriesId, model, row, today) };
  }

  const clamped = Math.min(Math.max(n, series.min), series.max);
  const model = series.fmt(clamped);
  const row = INDEX[normalizeModel(model)];
  return {
    ff: "tower",
    series,
    n: clamped,
    model,
    row,
    bricks: stackBricks(series, clamped),
    notes: buildNotes(seriesId, model, row, today),
  };
}

/** Finds the series a CEC row belongs to, for the "Check a model number" tab. */
export function seriesFor(row: FoxRow): FoxSeries | null {
  for (const id in SERIES) {
    const s = SERIES[id];
    if (s.ff === "tower" && row.s === s.csv) return s;
    if (s.ff === "wall" && baseModel(row.m) === s.model) return s;
  }
  return null;
}

export type DescribeBullet =
  | { kind: "stack"; master: string; slave: string; n: number }
  | { kind: "inverter" }
  | { kind: "wall-unit"; model: string };

export function describe(row: FoxRow): DescribeBullet[] {
  const m = baseModel(row.m);
  const series = seriesFor(row);
  if (series && series.ff === "tower") {
    const bullets: DescribeBullet[] = [];
    const match = m.match(/-[LH](\d+)/);
    const n = match ? Number(match[1]) : null;
    if (n) bullets.push({ kind: "stack", master: series.m, slave: series.s, n });
    bullets.push({ kind: "inverter" });
    return bullets;
  }
  return [{ kind: "wall-unit", model: m }];
}

export type Visual = { kind: "stack"; bricks: Brick[] } | { kind: "photo"; photo: PhotoKey; name: string } | null;

export function visual(row: FoxRow): Visual {
  const m = baseModel(row.m);
  const series = seriesFor(row);
  if (!series) return null;
  if (series.ff === "tower") {
    const match = m.match(/-[LH](\d+)/);
    if (!match) return null;
    return { kind: "stack", bricks: stackBricks(series, Number(match[1])) };
  }
  if (series.photo) return { kind: "photo", photo: series.photo, name: series.name };
  return null;
}

export type Verdict =
  | { kind: "empty" }
  | { kind: "match"; row: FoxRow; status: ExpiryStatus; describe: DescribeBullet[]; visual: Visual }
  | { kind: "module"; raw: string; series: TowerSeries }
  | { kind: "none"; raw: string; near: FoxRow[] };

export function computeVerdict(raw: string, today: Date): Verdict {
  const trimmed = raw.trim();
  const n = normalizeModel(trimmed);
  if (!n) return { kind: "empty" };

  const row = INDEX[n];
  if (row) {
    return { kind: "match", row, status: expiryStatus(row, today), describe: describe(row), visual: visual(row) };
  }

  for (const id in SERIES) {
    const s = SERIES[id];
    if (s.ff === "tower" && (normalizeModel(s.m) === n || normalizeModel(s.s) === n)) {
      return { kind: "module", raw: trimmed, series: s };
    }
  }

  const near = ROWS.filter((r) => {
    const rn = normalizeModel(r.m);
    return rn.includes(n) || n.includes(rn);
  }).slice(0, 6);
  return { kind: "none", raw: trimmed, near };
}

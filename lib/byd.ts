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
  /** Series code as listed on the CEC register */
  s: string;
  nom: number;
  use: number;
  ap: string;
  ex: string;
};

/**
 * BYD rows of the CEC approved battery list — 46 rows, 45 distinct models.
 * "Battery-Box Premium LVL15.4" appears twice: an expired listing and its
 * replacement. It is one model with two listing periods — see `liveRow`.
 */
export const ROWS: BydRow[] = [
  { m: "HVB 11.8", s: "BATTERY-BOX HVB", nom: 11.88, use: 11.88, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 14.8", s: "BATTERY-BOX HVB", nom: 14.85, use: 14.85, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 17.8", s: "BATTERY-BOX HVB", nom: 17.82, use: 17.82, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 20.7", s: "BATTERY-BOX HVB", nom: 20.79, use: 20.79, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 23.7", s: "BATTERY-BOX HVB", nom: 23.76, use: 23.76, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 26.7", s: "BATTERY-BOX HVB", nom: 26.72, use: 26.72, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 29.6", s: "BATTERY-BOX HVB", nom: 29.69, use: 29.69, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 5.9", s: "BATTERY-BOX HVB", nom: 5.94, use: 5.94, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVB 8.9", s: "BATTERY-BOX HVB", nom: 8.91, use: 8.91, ap: "11/06/2026", ex: "31/12/2027" },
  { m: "HVE 10.7", s: "HVE", nom: 10.72, use: 10.72, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 12.8-1", s: "HVE", nom: 12.86, use: 12.86, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 12.8-2", s: "HVE", nom: 12.87, use: 12.87, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 15.0", s: "HVE", nom: 15.01, use: 15.01, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 17.1-1", s: "HVE", nom: 17.16, use: 17.16, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 17.1-2", s: "HVE", nom: 17.16, use: 17.16, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 19.2", s: "HVE", nom: 19.29, use: 19.29, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 19.3", s: "HVE", nom: 19.3, use: 19.3, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 21.4", s: "HVE", nom: 21.44, use: 21.44, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 23.5", s: "HVE", nom: 23.58, use: 23.58, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 6.4", s: "HVE", nom: 6.43, use: 6.43, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVE 8.5", s: "HVE", nom: 8.58, use: 8.58, ap: "2/12/2025", ex: "31/12/2027" },
  { m: "HVM+ 11.0", s: "HVM+", nom: 11.04, use: 11.04, ap: "30/06/2026", ex: "31/12/2027" },
  { m: "HVM+ 13.8", s: "HVM+", nom: 13.8, use: 13.8, ap: "30/06/2026", ex: "31/12/2027" },
  { m: "HVM+ 16.6", s: "HVM+", nom: 16.56, use: 16.56, ap: "30/06/2026", ex: "31/12/2027" },
  { m: "HVM+ 19.3", s: "HVM+", nom: 19.32, use: 19.32, ap: "30/06/2026", ex: "31/12/2027" },
  { m: "HVM+ 22.1", s: "HVM+", nom: 22.08, use: 22.08, ap: "30/06/2026", ex: "31/12/2027" },
  { m: "HVM+ 8.3", s: "HVM+", nom: 8.28, use: 8.28, ap: "30/06/2026", ex: "31/12/2027" },
  { m: "HVM 11.0", s: "HVM", nom: 11.04, use: 11.04, ap: "8/06/2023", ex: "5/12/2026" },
  { m: "HVM 13.8", s: "HVM", nom: 13.8, use: 13.8, ap: "8/06/2023", ex: "5/12/2026" },
  { m: "HVM 16.6", s: "HVM", nom: 16.56, use: 16.56, ap: "8/06/2023", ex: "5/12/2026" },
  { m: "HVM 19.3", s: "HVM", nom: 19.32, use: 19.32, ap: "8/06/2023", ex: "5/12/2026" },
  { m: "HVM 22.1", s: "HVM", nom: 22.08, use: 22.08, ap: "8/06/2023", ex: "5/12/2026" },
  { m: "HVM 8.3", s: "HVM", nom: 8.28, use: 8.28, ap: "8/06/2023", ex: "5/12/2026" },
  { m: "HVS 10.2", s: "HVS", nom: 10.24, use: 10.24, ap: "19/10/2023", ex: "19/10/2026" },
  { m: "HVS 12.8", s: "HVS", nom: 12.8, use: 12.8, ap: "19/10/2023", ex: "19/10/2026" },
  { m: "HVS 5.1", s: "HVS", nom: 5.12, use: 5.12, ap: "19/10/2023", ex: "19/10/2026" },
  { m: "HVS 7.7", s: "HVS", nom: 7.68, use: 7.68, ap: "19/10/2023", ex: "19/10/2026" },
  { m: "LV Flex", s: "Battery-Box", nom: 5.0, use: 5.0, ap: "25/06/2025", ex: "31/12/2027" },
  { m: "LVS 12.0", s: "LVS", nom: 12.0, use: 12.0, ap: "31/10/2023", ex: "7/12/2026" },
  { m: "LVS 16.0", s: "LVS", nom: 16.0, use: 16.0, ap: "31/10/2023", ex: "7/12/2026" },
  { m: "LVS 20.0", s: "LVS", nom: 20.0, use: 20.0, ap: "31/10/2023", ex: "7/12/2026" },
  { m: "LVS 24.0", s: "LVS", nom: 24.0, use: 24.0, ap: "31/10/2023", ex: "7/12/2026" },
  { m: "LVS 4.0", s: "LVS", nom: 4.0, use: 4.0, ap: "31/10/2023", ex: "7/12/2026" },
  { m: "LVS 8.0", s: "LVS", nom: 8.0, use: 8.0, ap: "31/10/2023", ex: "7/12/2026" },
  { m: "Battery-Box Premium LVL15.4", s: "LVL", nom: 15.36, use: 15.36, ap: "22/07/2026", ex: "31/12/2027" },
  { m: "Battery-Box Premium LVL15.4", s: "LVL", nom: 15.36, use: 15.36, ap: "20/04/2023", ex: "19/07/2026" },
];

/** Keeps case folded but preserves "+", "-" and "." so e.g. HVM vs HVM+ and HVE's -1/-2 suffixes stay distinct. */
export function normalizeModel(s: string): string {
  return String(s).toLowerCase().replace(/[^a-z0-9.+-]/g, "");
}

function parseDdMmYyyy(d: string): Date {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

/** Days until a row's CEC expiry, negative if already expired. Pass `today` explicitly — never cache this. */
export function daysLeft(row: BydRow, today: Date): number {
  return Math.round((parseDdMmYyyy(row.ex).getTime() - today.getTime()) / 86400000);
}

export function isExpired(row: BydRow, today: Date): boolean {
  return daysLeft(row, today) < 0;
}

export const EXPIRING_SOON_DAYS = 185;

export type ExpiryBucket = "expired" | "expiring" | "current";

export function expiryBucket(row: BydRow, today: Date): ExpiryBucket {
  const d = daysLeft(row, today);
  if (d < 0) return "expired";
  if (d < EXPIRING_SOON_DAYS) return "expiring";
  return "current";
}

/** Resolves a model string to its row, preferring the live listing when the model appears more than once (LVL). */
export function liveRow(model: string, today: Date): BydRow | null {
  const n = normalizeModel(model);
  const all = ROWS.filter((r) => normalizeModel(r.m) === n);
  if (!all.length) return null;
  const live = all.filter((r) => !isExpired(r, today));
  return live.length ? live[0] : all[0];
}

/** HVE module mix -> listed model. Key is "<4.29 kWh count>-<6.43 kWh count>". */
export const HVE_MIX: Record<string, string> = {
  "0-1": "HVE 6.4",
  "2-0": "HVE 8.5",
  "1-1": "HVE 10.7",
  "0-2": "HVE 12.8-1",
  "3-0": "HVE 12.8-2",
  "2-1": "HVE 15.0",
  "1-2": "HVE 17.1-1",
  "4-0": "HVE 17.1-2",
  "0-3": "HVE 19.2",
  "3-1": "HVE 19.3",
  "2-2": "HVE 21.4",
  "1-3": "HVE 23.5",
};

export type PhotoKey = "LVL" | "FLEX" | "HV" | "LVS" | "HVE" | "HVB";

type FamBase = {
  id: string;
  csv: string;
  name: string;
  short?: string;
  acc: PhotoKey;
};

export type SingleFamily = FamBase & { kind: "single"; single: string; unit: number };
export type ModuleFamily = FamBase & { kind: "modules"; mod: number; min: number; max: number; fmt: (n: number) => string };
export type MixFamily = FamBase & { kind: "mix"; modA: number; modB: number; maxTotal: number };
export type BydFamily = SingleFamily | ModuleFamily | MixFamily;

const HVS_FMT: Record<number, string> = { 2: "5.1", 3: "7.7", 4: "10.2", 5: "12.8" };
const HVM_FMT: Record<number, string> = { 3: "8.3", 4: "11.0", 5: "13.8", 6: "16.6", 7: "19.3", 8: "22.1" };
const HVB_FMT: Record<number, string> = {
  2: "5.9", 3: "8.9", 4: "11.8", 5: "14.8", 6: "17.8", 7: "20.7", 8: "23.7", 9: "26.7", 10: "29.6",
};

/** Selectable series for step 1, in display order. */
export const FAMS: BydFamily[] = [
  { kind: "single", id: "LVL", csv: "LVL", name: "Battery-Box Premium LVL15.4", short: "LVL 15.4", single: "Battery-Box Premium LVL15.4", unit: 15.36, acc: "LVL" },
  { kind: "single", id: "FLEX", csv: "Battery-Box", name: "LV Flex", single: "LV Flex", unit: 5.0, acc: "FLEX" },
  { kind: "modules", id: "HVS", csv: "HVS", name: "HVS", mod: 2.56, min: 2, max: 5, acc: "HV", fmt: (n) => `HVS ${HVS_FMT[n]}` },
  { kind: "modules", id: "HVM", csv: "HVM", name: "HVM", mod: 2.76, min: 3, max: 8, acc: "HV", fmt: (n) => `HVM ${HVM_FMT[n]}` },
  { kind: "modules", id: "HVM+", csv: "HVM+", name: "HVM+", mod: 2.76, min: 3, max: 8, acc: "HV", fmt: (n) => `HVM+ ${HVM_FMT[n]}` },
  { kind: "modules", id: "LVS", csv: "LVS", name: "LVS", mod: 4.0, min: 1, max: 6, acc: "LVS", fmt: (n) => `LVS ${n * 4}.0` },
  { kind: "mix", id: "HVE", csv: "HVE", name: "HVE", modA: 4.29, modB: 6.43, maxTotal: 4, acc: "HVE" },
  { kind: "modules", id: "HVB", csv: "BATTERY-BOX HVB", name: "HVB", mod: 2.97, min: 2, max: 10, acc: "HVB", fmt: (n) => `HVB ${HVB_FMT[n]}` },
];

export function famById(id: string): BydFamily {
  const f = FAMS.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown BYD family: ${id}`);
  return f;
}

export function famRows(f: BydFamily): BydRow[] {
  return ROWS.filter((r) => r.s === f.csv);
}

export function tileSubLabel(fam: BydFamily): string {
  if (fam.kind === "mix") return "4.29 / 6.43 kWh modules";
  if (fam.kind === "single") return `${fam.unit.toFixed(2)} kWh usable`;
  return `${fam.mod.toFixed(2)} kWh module`;
}

export type AccRow = {
  id: PhotoKey;
  famIds: string[];
  name: string;
  photo: PhotoKey;
  desc: string;
};

/** "Telling the series apart" accordion rows, in display order. */
export const ACC: AccRow[] = [
  {
    id: "LVL",
    famIds: ["LVL"],
    name: "Battery-Box Premium LVL15.4",
    photo: "LVL",
    desc: "Floor-mounted rectangular cabinet, up to two cabinets can be stacked directly on top of each other.",
  },
  {
    id: "FLEX",
    famIds: ["FLEX"],
    name: "LV Flex",
    photo: "FLEX",
    desc: "Rack-mounted module inside an enclosure, each battery is CEC listed individually.",
  },
  {
    id: "HV",
    famIds: ["HVS", "HVM", "HVM+"],
    name: "HVS, HVM and HVM+",
    photo: "HV",
    desc: "The same tower — same width, depth and module height, same finish. HVM+ is equivalent to the HVM, but listed under a different manufacturer entity.",
  },
  {
    id: "LVS",
    famIds: ["LVS"],
    name: "LVS",
    photo: "LVS",
    desc: "Looks similar to the HVM and stands the same height for the same number of modules, but each module is wider and holds more energy.",
  },
  {
    id: "HVE",
    famIds: ["HVE"],
    name: "HVE",
    photo: "HVE",
    desc: "Slimmer looking than the HVS or HVM, and can be wall mounted.",
  },
  {
    id: "HVB",
    famIds: ["HVB"],
    name: "HVB",
    photo: "HVB",
    desc: "Similar looking to the HVS or HVM, but more compact and wider.",
  },
];

export function accById(id: PhotoKey): AccRow {
  const a = ACC.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown BYD accordion row: ${id}`);
  return a;
}

export type AccStats = { distinctModelCount: number; capRangeLabel: string };

export function accordionStats(row: AccRow): AccStats {
  const fams = row.famIds.map(famById);
  let rows: BydRow[] = [];
  fams.forEach((f) => {
    rows = rows.concat(famRows(f));
  });
  const seen = new Set<string>();
  rows.forEach((r) => seen.add(r.m));
  const caps = rows.map((r) => r.use);
  const single = fams.length === 1 && fams[0].kind === "single";
  const capRangeLabel = single
    ? `${rows[0].use.toFixed(2)} kWh`
    : `${Math.min(...caps).toFixed(2)}–${Math.max(...caps).toFixed(2)} kWh`;
  return { distinctModelCount: seen.size, capRangeLabel };
}

export type AccPill = { label: string; tone: "stop" | "warn" | "ok" };

export function accordionPills(row: AccRow, today: Date): AccPill[] {
  const fams = row.famIds.map(famById);
  const many = fams.length > 1;
  return fams.map((f) => {
    const rows = famRows(f);
    const live = rows.filter((r) => !isExpired(r, today));
    const dl = live.length ? Math.min(...live.map((r) => daysLeft(r, today))) : -1;
    const prefix = many ? `${f.name}: ` : "";
    if (!live.length) return { label: many ? `${f.name}: expired` : "Expired", tone: "stop" };
    if (dl < EXPIRING_SOON_DAYS) return { label: `${prefix}expires in ${dl} days`, tone: "warn" };
    return { label: `${prefix}current`, tone: "ok" };
  });
}

export type ComparisonColumn = {
  famName: string;
  moduleCap: string;
  moduleRange: string;
  totalRange: string;
  expiryList: string;
};

/** Three-column comparison table for the combined HVS/HVM/HVM+ accordion row. */
export function comparisonColumns(row: AccRow): ComparisonColumn[] {
  return row.famIds.map((id) => {
    const f = famById(id) as ModuleFamily;
    const rows = famRows(f);
    const caps = rows.map((r) => r.use);
    const exDates: string[] = [];
    rows.forEach((r) => {
      if (!exDates.includes(r.ex)) exDates.push(r.ex);
    });
    return {
      famName: f.name,
      moduleCap: `${f.mod.toFixed(2)} kWh`,
      moduleRange: `${f.min}–${f.max}`,
      totalRange: `${Math.min(...caps).toFixed(2)}–${Math.max(...caps).toFixed(2)} kWh`,
      expiryList: exDates.join(" / "),
    };
  });
}

export type SpecRow = { label: string; value: string };

/** Spec list for a single-family accordion row (everything except the combined HV row). */
export function specRows(fam: BydFamily): SpecRow[] {
  if (fam.kind === "mix") {
    return [
      { label: "Module capacity", value: "4.29 kWh or 6.43 kWh" },
      { label: "Number of modules", value: "1–4" },
    ];
  }
  if (fam.kind === "single") {
    return [{ label: "Usable capacity", value: `${fam.unit.toFixed(2)} kWh` }];
  }
  return [
    { label: "Module capacity", value: `${fam.mod.toFixed(2)} kWh` },
    { label: "Number of modules", value: `${fam.min}–${fam.max}` },
  ];
}

export type Brick = { kind: "control" | "module" | "module-a" | "module-b"; label: string };

export function stackBricks(fam: ModuleFamily, n: number): Brick[] {
  const bricks: Brick[] = [{ kind: "control", label: "control unit" }];
  for (let i = 0; i < n; i++) bricks.push({ kind: "module", label: `${fam.name} module` });
  return bricks;
}

export function mixBricks(a: number, b: number): Brick[] {
  const bricks: Brick[] = [{ kind: "control", label: "control unit" }];
  for (let i = 0; i < b; i++) bricks.push({ kind: "module-b", label: "6.43 kWh" });
  for (let i = 0; i < a; i++) bricks.push({ kind: "module-a", label: "4.29 kWh" });
  return bricks;
}

export type BuildNote =
  | { kind: "not-listed" }
  | { kind: "expired"; ap: string; ex: string }
  | { kind: "expiring"; ex: string; days: number }
  | { kind: "hvm-cross-check"; other: string }
  | { kind: "hvm-plus-cross-check"; other: string }
  | { kind: "flex-per-module" };

export type BuildResult = {
  model: string | null;
  row: BydRow | null;
  bucket: ExpiryBucket | null;
  /** Days until expiry, when `row` is set. */
  days: number | null;
  usable: string;
  nominal: string;
  moduleCap: string;
  moduleCount: string;
  approved: string;
  expires: string;
  accId: PhotoKey;
  accName: string;
  notes: BuildNote[];
};

function finishBuild(fam: BydFamily, model: string | null, moduleCap: string, moduleCount: string, today: Date): BuildResult {
  const row = model ? liveRow(model, today) : null;
  const bucket = row ? expiryBucket(row, today) : null;
  const notes: BuildNote[] = [];

  if (!model) notes.push({ kind: "not-listed" });
  if (row && bucket === "expired") notes.push({ kind: "expired", ap: row.ap, ex: row.ex });
  else if (row && bucket === "expiring") notes.push({ kind: "expiring", ex: row.ex, days: daysLeft(row, today) });

  if (fam.id === "HVM" && model) notes.push({ kind: "hvm-cross-check", other: `HVM+ ${model.slice(4)}` });
  if (fam.id === "HVM+" && model) notes.push({ kind: "hvm-plus-cross-check", other: `HVM ${model.slice(5)}` });
  if (fam.id === "FLEX") notes.push({ kind: "flex-per-module" });

  const acc = accById(fam.acc);

  return {
    model,
    row,
    bucket,
    days: row ? daysLeft(row, today) : null,
    usable: row ? `${row.use.toFixed(2)} kWh` : "—",
    nominal: row ? `${row.nom.toFixed(2)} kWh` : "—",
    moduleCap,
    moduleCount,
    approved: row?.ap ?? "—",
    expires: row?.ex ?? "—",
    accId: acc.id,
    accName: acc.name,
    notes,
  };
}

export function computeModulesBuild(fam: ModuleFamily, n: number, today: Date): BuildResult {
  const clamped = Math.min(Math.max(n, fam.min), fam.max);
  const model = fam.fmt(clamped);
  return finishBuild(fam, model, `${fam.mod.toFixed(2)} kWh`, String(clamped), today);
}

export function computeMixBuild(fam: MixFamily, a: number, b: number, today: Date): BuildResult {
  const model = HVE_MIX[`${a}-${b}`] ?? null;
  const moduleCap =
    [a ? `${a} × 4.29` : "", b ? `${b} × 6.43` : ""].filter(Boolean).join(" + ") + " kWh";
  return finishBuild(fam, model, moduleCap, String(a + b), today);
}

export function computeSingleBuild(fam: SingleFamily, today: Date): BuildResult {
  const moduleCount = fam.id === "FLEX" ? "CEC listed individually" : "—";
  return finishBuild(fam, fam.single, "—", moduleCount, today);
}

export type ModelInfo =
  | { kind: "single"; fam: SingleFamily }
  | { kind: "modules"; fam: ModuleFamily; n: number }
  | { kind: "mix"; fam: MixFamily; a: number; b: number };

/** model string (normalized) -> which family/count built it, for the "Check a model number" tab. */
export const MODEL_INFO: Record<string, ModelInfo> = (() => {
  const map: Record<string, ModelInfo> = {};
  for (const fam of FAMS) {
    if (fam.kind === "single") {
      map[normalizeModel(fam.single)] = { kind: "single", fam };
    } else if (fam.kind === "mix") {
      for (const key in HVE_MIX) {
        const [a, b] = key.split("-").map(Number);
        map[normalizeModel(HVE_MIX[key])] = { kind: "mix", fam, a, b };
      }
    } else {
      for (let n = fam.min; n <= fam.max; n++) {
        map[normalizeModel(fam.fmt(n))] = { kind: "modules", fam, n };
      }
    }
  }
  return map;
})();

export type Verdict =
  | { kind: "empty" }
  | {
      kind: "match";
      row: BydRow;
      bucket: ExpiryBucket;
      moduleCap: string;
      moduleCount: string;
      info: ModelInfo | null;
      crossCheck: "HVM" | "HVM+" | null;
      duplicate: boolean;
    }
  | { kind: "none"; raw: string; near: BydRow[] };

export function computeVerdict(raw: string, today: Date): Verdict {
  const trimmed = raw.trim();
  const n = normalizeModel(trimmed);
  if (!n) return { kind: "empty" };

  const all = ROWS.filter((r) => normalizeModel(r.m) === n);
  if (all.length) {
    const live = all.filter((r) => !isExpired(r, today));
    const row = live.length ? live[0] : all[0];
    const bucket = expiryBucket(row, today);
    const info = MODEL_INFO[n] ?? null;

    let moduleCap = "—";
    let moduleCount = "—";
    if (info) {
      if (info.kind === "mix") {
        moduleCap =
          [info.a ? `${info.a} × 4.29` : "", info.b ? `${info.b} × 6.43` : ""].filter(Boolean).join(" + ") +
          " kWh";
        moduleCount = String(info.a + info.b);
      } else if (info.kind === "single") {
        moduleCount = info.fam.id === "FLEX" ? "CEC listed individually" : "—";
      } else {
        moduleCap = `${info.fam.mod.toFixed(2)} kWh`;
        moduleCount = String(info.n);
      }
    }

    let crossCheck: "HVM" | "HVM+" | null = null;
    if (/^hvm[0-9.]/.test(n)) crossCheck = "HVM+";
    if (/^hvm\+/.test(n)) crossCheck = "HVM";

    return { kind: "match", row, bucket, moduleCap, moduleCount, info, crossCheck, duplicate: all.length > 1 };
  }

  const near = ROWS.filter((r) => {
    const rn = normalizeModel(r.m);
    return rn.includes(n) || n.includes(rn);
  }).slice(0, 6);
  return { kind: "none", raw: trimmed, near };
}

export function checkVisual(info: ModelInfo | null): Brick[] | null {
  if (!info) return null;
  if (info.kind === "single") return null;
  if (info.kind === "mix") return mixBricks(info.a, info.b);
  return stackBricks(info.fam, info.n);
}

import raw from "@/data/models.json";

export type Model = {
  /** Full CEC-approved model name, e.g. "SigenStor-10T-EV12-24.1" */
  m: string;
  /** Inverter code, e.g. "10T" */
  i: string;
  /** EV charger code: "", "EV12" or "EV25" */
  e: string;
  /** Module counts, in MODULE_SIZES order: [5kWh, 6kWh, 8kWh, 10kWh] */
  b: [number, number, number, number];
  /** Total module count */
  q: number;
  /** Nominal capacity, kWh */
  n: number;
  /** Usable capacity, kWh */
  u: number;
};

export const MODELS = raw as Model[];

/** Battery module sizes, in the order used by `Model.b`. */
export const MODULE_SIZES = [5, 6, 8, 10] as const;

/** Single-phase inverters first, then three-phase — the order Sigenergy lists them. */
export const INVERTERS = [
  "3S", "5S", "6S", "8S", "10S", "12S",
  "5T", "10T", "15T", "20T", "25T", "30T",
] as const;

export const EV_CHARGERS = ["", "EV12", "EV25"] as const;

export const MAX_MODULES = 6;

export const STANDARD = "AS4777-2 2020";

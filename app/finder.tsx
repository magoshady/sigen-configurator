"use client";

import { useMemo, useState } from "react";
import {
  EV_CHARGERS,
  INVERTERS,
  MODELS,
  MODULE_SIZES,
  MAX_MODULES as MAX,
  STANDARD,
  type Model,
} from "@/lib/models";

type Counts = [number, number, number, number];
type Mode = "count" | "name";

const ZERO: Counts = [0, 0, 0, 0];

/** Sort so the smallest inverter and the plain (non-EV) variants come first. */
function rank(m: Model) {
  const phase = m.i.endsWith("S") ? 0 : 1;
  const size = parseInt(m.i, 10);
  const ev = m.e === "" ? 0 : m.e === "EV12" ? 1 : 2;
  return [phase, size, ev] as const;
}

function compare(a: Model, b: Model) {
  const [ap, as_, ae] = rank(a);
  const [bp, bs, be] = rank(b);
  return ap - bp || as_ - bs || ae - be || a.n - b.n;
}

export default function Finder() {
  const [mode, setMode] = useState<Mode>("count");
  const [counts, setCounts] = useState<Counts>(ZERO);
  const [query, setQuery] = useState("");
  const [inverter, setInverter] = useState("");
  const [ev, setEv] = useState("any");

  const total = counts.reduce((a, b) => a + b, 0);
  const searching = mode === "name" && query.trim().length >= 2;
  const active = mode === "count" ? total > 0 : searching;

  const results = useMemo(() => {
    if (!active) return [];
    const q = query.trim().toLowerCase().replace(/\s+/g, "");
    return MODELS.filter((m) => {
      if (inverter && m.i !== inverter) return false;
      if (ev !== "any" && m.e !== ev) return false;
      if (mode === "count") {
        return m.b.every((n, i) => n === counts[i]);
      }
      return m.m.toLowerCase().replace(/\s+/g, "").includes(q);
    }).sort(compare);
  }, [active, mode, counts, query, inverter, ev]);

  function setCount(i: number, next: number) {
    setCounts((prev) => {
      const others = prev.reduce((a, b, j) => (j === i ? a : a + b), 0);
      const clamped = Math.max(0, Math.min(next, MAX - others));
      const out = [...prev] as Counts;
      out[i] = clamped;
      return out;
    });
  }

  function clear() {
    setCounts(ZERO);
    setQuery("");
    setInverter("");
    setEv("any");
  }

  const dirty = total > 0 || query !== "" || inverter !== "" || ev !== "any";

  return (
    <section className="rounded-2xl border border-rule bg-card overflow-hidden">
      {/* Mode tabs */}
      <div className="grid grid-cols-2 border-b border-rule" role="tablist">
        {(
          [
            ["count", "By module count"],
            ["name", "By model name"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            aria-selected={mode === value}
            onClick={() => setMode(value)}
            className={`px-4 py-3.5 text-sm transition-colors cursor-pointer ${
              mode === value
                ? "text-ink bg-card font-medium"
                : "text-ink-faint bg-wash hover:text-ink-soft"
            } ${value === "name" ? "border-l border-rule" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="p-5 sm:p-6 grid gap-5">
        <div>
          {mode === "count" ? (
            <>
              <Label>Battery modules installed</Label>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {MODULE_SIZES.map((size, i) => (
                  <Stepper
                    key={size}
                    label={`${size} kWh`}
                    value={counts[i]}
                    canAdd={total < MAX}
                    onChange={(n) => setCount(i, n)}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-faint tnum">
                {total} of {MAX} module slots used
                {total >= MAX ? " — stack full" : ""}
              </p>
            </>
          ) : (
            <>
              <Label>Search model name</Label>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 10T-48 or EV12"
                className="w-full rounded-lg border border-rule-strong bg-card px-3.5 py-2.5 text-sm outline-none focus:border-ink-soft focus:ring-2 focus:ring-ink/5"
              />
              <p className="mt-3 text-xs text-ink-faint">
                Enter at least 2 characters. Matches anywhere in the name.
              </p>
            </>
          )}
        </div>

        <div className="h-px bg-rule" aria-hidden />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Inverter</Label>
            <Select
              value={inverter}
              onChange={setInverter}
              options={[
                { value: "", label: "Any" },
                ...INVERTERS.map((i) => ({
                  value: i,
                  label: `${i} — ${parseInt(i, 10)} kW ${
                    i.endsWith("S") ? "single-phase" : "three-phase"
                  }`,
                })),
              ]}
            />
          </div>
          <div>
            <Label>EV charger</Label>
            <Select
              value={ev}
              onChange={setEv}
              options={[
                { value: "any", label: "Any" },
                ...EV_CHARGERS.map((e) => ({
                  value: e,
                  label: e === "" ? "None" : e,
                })),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between gap-4 border-t border-rule px-5 sm:px-6 py-3">
        <p className="text-xs text-ink-soft tnum">
          {active
            ? `${results.length} matching ${
                results.length === 1 ? "model" : "models"
              }`
            : `${MODELS.length.toLocaleString()} approved models`}
        </p>
        <button
          onClick={clear}
          disabled={!dirty}
          className="text-xs text-ink-soft underline underline-offset-4 hover:text-ink disabled:opacity-30 disabled:no-underline disabled:cursor-default cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      <div className="border-t border-rule bg-wash/60 p-5 sm:p-6">
        {!active ? (
          <Empty
            title={
              mode === "count"
                ? "Enter your module counts"
                : "Type to search models"
            }
            body={
              mode === "count"
                ? "Set how many batteries of each size are installed on site."
                : "Enter at least two characters of the SigenStor model name."
            }
          />
        ) : results.length === 0 ? (
          <Empty
            title="No approved model matches"
            body="That combination is not on the CEC approved list. Re-check the module counts, or widen the inverter and EV charger filters."
          />
        ) : (
          <ul className="grid gap-2.5">
            {results.map((m) => (
              <Row key={m.m} model={m} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Row({ model }: { model: Model }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(model.m);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <li className="rounded-xl border border-rule bg-card px-4 py-3.5 sm:px-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="font-medium tnum">{model.m}</h3>
          <span className="text-[11px] text-ink-faint">({STANDARD})</span>
        </div>
        <p className="mt-1 text-xs text-ink-soft tnum">
          {model.n} kWh nominal · {model.u} kWh usable
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap sm:justify-end shrink-0">
        <Chip tone="solid">{model.i}</Chip>
        {model.b.map((n, i) =>
          n > 0 ? (
            <Chip key={i}>
              {n}× {MODULE_SIZES[i]} kWh
            </Chip>
          ) : null
        )}
        {model.e && <Chip tone="ev">{model.e}</Chip>}
        <button
          onClick={copy}
          aria-label={`Copy ${model.m}`}
          className="ml-1 rounded-md border border-rule px-2 py-1 text-[11px] text-ink-soft hover:border-rule-strong hover:text-ink transition-colors cursor-pointer w-14"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </li>
  );
}

function Chip({
  children,
  tone = "plain",
}: {
  children: React.ReactNode;
  tone?: "plain" | "solid" | "ev";
}) {
  const styles = {
    plain: "bg-wash text-ink-soft",
    solid: "bg-ink text-paper",
    ev: "bg-ink/8 text-ink ring-1 ring-inset ring-rule-strong",
  }[tone];
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] whitespace-nowrap tnum ${styles}`}
    >
      {children}
    </span>
  );
}

function Stepper({
  label,
  value,
  canAdd,
  onChange,
}: {
  label: string;
  value: number;
  canAdd: boolean;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-rule bg-card px-3 py-1.5">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-1">
        <StepButton
          onClick={() => onChange(value - 1)}
          disabled={value === 0}
          label={`Remove one ${label} module`}
        >
          −
        </StepButton>
        <span className="w-6 text-center text-sm tnum">{value}</span>
        <StepButton
          onClick={() => onChange(value + 1)}
          disabled={!canAdd}
          label={`Add one ${label} module`}
        >
          +
        </StepButton>
      </div>
    </div>
  );
}

function StepButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="h-7 w-7 rounded-md border border-rule text-ink-soft leading-none hover:border-rule-strong hover:text-ink disabled:opacity-25 disabled:hover:border-rule disabled:cursor-default transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-rule-strong bg-card px-3 py-2.5 text-sm outline-none focus:border-ink-soft focus:ring-2 focus:ring-ink/5 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
      {children}
    </p>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="py-14 text-center">
      <p className="font-medium">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">{body}</p>
    </div>
  );
}

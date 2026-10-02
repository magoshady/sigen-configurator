"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  SERIES,
  FF_SERIES,
  INDEX,
  normalizeModel,
  computeBuild,
  computeVerdict,
  type FormFactor,
  type Brick,
  type BuildResult,
  type Verdict,
  type DescribeBullet,
  type Visual,
  type PhotoKey,
} from "@/lib/foxess";

const PHOTO_SRC: Record<PhotoKey, string> = {
  EP5: "/foxess/ep5.jpg",
  EP11: "/foxess/ep11.jpg",
  EP12: "/foxess/ep12-plus.jpg",
};

const EXAMPLE_MODELS = ["CQ6-L5", "CQ7-L8", "EQ4800-L4", "EQ5500-L3", "ECS2900-H4", "1K5-BAT-4660-L6", "EP11"];

type Tab = "build" | "check";

export default function FoxessFinder() {
  const [tab, setTab] = useState<Tab>("build");
  const [ff, setFf] = useState<FormFactor>("tower");
  const [seriesId, setSeriesId] = useState("CQ6");
  const [n, setN] = useState(5);
  const [query, setQuery] = useState("");

  const today = useMemo(() => new Date(), []);
  const result = useMemo(() => computeBuild(ff, seriesId, n, today), [ff, seriesId, n, today]);
  const verdict = useMemo(() => computeVerdict(query, today), [query, today]);

  function selectFf(next: FormFactor) {
    setFf(next);
    const firstId = FF_SERIES[next][0];
    setSeriesId(firstId);
    const first = SERIES[firstId];
    if (first.ff === "tower") setN(Math.min(Math.max(5, first.min), first.max));
  }

  function selectSeries(id: string) {
    setSeriesId(id);
    const series = SERIES[id];
    if (series.ff === "tower") setN((prev) => Math.min(Math.max(prev, series.min), series.max));
  }

  return (
    <section className="rounded-2xl border border-rule bg-card overflow-hidden">
      <div className="grid grid-cols-2 border-b border-rule" role="tablist">
        {(
          [
            ["build", "From the photos"],
            ["check", "Check a model number"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={`relative px-4 py-3.5 text-sm transition-colors cursor-pointer ${
              tab === value
                ? "text-ink bg-card font-medium after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:bg-green"
                : "text-ink-faint bg-wash hover:text-ink-soft"
            } ${value === "check" ? "border-l border-rule" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "build" ? (
        <BuildPane
          ff={ff}
          seriesId={seriesId}
          n={n}
          result={result}
          onSelectFf={selectFf}
          onSelectSeries={selectSeries}
          onChangeN={setN}
        />
      ) : (
        <CheckPane query={query} setQuery={setQuery} verdict={verdict} />
      )}
    </section>
  );
}

function BuildPane({
  ff,
  seriesId,
  n,
  result,
  onSelectFf,
  onSelectSeries,
  onChangeN,
}: {
  ff: FormFactor;
  seriesId: string;
  n: number;
  result: BuildResult;
  onSelectFf: (ff: FormFactor) => void;
  onSelectSeries: (id: string) => void;
  onChangeN: (n: number) => void;
}) {
  const seriesIds = FF_SERIES[ff];

  return (
    <div className="grid sm:grid-cols-2">
      <div className="p-5 sm:p-6 grid gap-6 sm:border-r sm:border-rule">
        <Field n={1} title="Is it a stack of modules, or one whole unit?" help="Start with the shape of the battery in the photo, before reading any label.">
          <SegGroup
            name="ff"
            stacked
            value={ff}
            onChange={(v) => onSelectFf(v as FormFactor)}
            options={[
              { value: "tower", label: "Stack of modules", sub: "Modules stacked on top of each other — 75 models" },
              { value: "wall", label: "Single unit", sub: "Single battery unit — 3 models. Multiple units can be installed together." },
            ]}
          />
        </Field>

        <Field
          n={2}
          title="Model name"
          help={
            ff === "tower"
              ? "Model as per the module nameplate — every module in the stack carries it."
              : "Model as per the nameplate."
          }
        >
          <SegGroup
            name="series"
            value={seriesId}
            onChange={onSelectSeries}
            options={seriesIds.map((id) => {
              const s = SERIES[id];
              const sub =
                s.ff === "tower"
                  ? `${s.kwh.toFixed(2)} kWh per module`
                  : `${(INDEX[normalizeModel(s.model)]?.use ?? 0).toFixed(2)} kWh usable`;
              return { value: id, label: s.name, sub };
            })}
          />
        </Field>

        {result.ff === "tower" && (
          <Field
            n={3}
            title="Modules in the stack"
            help={
              <>
                Count every module, including the top one. The top module is the master (
                <span className="font-mono">-M</span>); the ones below it are slaves (
                <span className="font-mono">-S</span>).
              </>
            }
          >
            <div className="flex flex-wrap items-start gap-5">
              <div>
                <CountStepper value={n} min={result.series.min} max={result.series.max} onChange={onChangeN} />
                <p className="mt-1.5 text-xs text-ink-faint tnum">
                  {result.series.min}–{result.series.max} modules
                </p>
              </div>
              <StackDiagram bricks={result.bricks} n={result.n} />
            </div>
          </Field>
        )}
      </div>

      <BuildResultPanel result={result} />
    </div>
  );
}

function BuildResultPanel({ result }: { result: BuildResult }) {
  const row = result.row;

  return (
    <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">CEC approved model</p>
        <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum break-words">{result.model}</p>
        {row && (
          <div className="mt-2">
            <StatusPill expired={result.notes.expiry?.kind === "expired"} />
          </div>
        )}
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
        <dt className="text-ink-faint">Usable capacity</dt>
        <dd className="tnum">{row ? `${row.use.toFixed(2)} kWh` : "—"}</dd>
        <dt className="text-ink-faint">Nominal capacity</dt>
        <dd className="tnum">{row ? `${row.nom.toFixed(2)} kWh` : "—"}</dd>
        <dt className="text-ink-faint">Approved</dt>
        <dd className="tnum">{row?.ap ?? "—"}</dd>
        <dt className="text-ink-faint">Expires</dt>
        <dd className="tnum">{row?.ex ?? "—"}</dd>
      </dl>

      {result.ff === "wall" ? (
        <div className="border-t border-rule pt-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">What it looks like</p>
          <div className="mt-2.5 max-w-[300px] overflow-hidden rounded-lg border border-rule">
            <Image
              src={PHOTO_SRC[result.series.photo]}
              alt={`A ${result.series.name} battery mounted on a wall.`}
              width={440}
              height={493}
              className="h-auto w-full bg-wash"
            />
          </div>
        </div>
      ) : (
        <div className="border-t border-rule pt-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">Photos must show</p>
          <ul className="mt-2 space-y-2 text-sm">
            <ExpectItem>
              <b>1×</b> master module labelled <span className="tnum">{result.series.m}</span>, on top of the
              stack
            </ExpectItem>
            <ExpectItem>
              <b>{result.n - 1}×</b> slave module{result.n - 1 === 1 ? "" : "s"} labelled{" "}
              <span className="tnum">{result.series.s}</span> below it
            </ExpectItem>
            <ExpectItem>At least one legible module label</ExpectItem>
            <ExpectItem>A separate inverter — a stack is battery only</ExpectItem>
          </ul>
        </div>
      )}

      <BuildNotes result={result} />
    </div>
  );
}

function StatusPill({ expired }: { expired: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${
        expired ? "bg-red/15 text-red-deep" : "bg-green/15 text-green-deep"
      }`}
    >
      {expired ? "CEC listing expired" : "Current CEC listing"}
    </span>
  );
}

function BuildNotes({ result }: { result: BuildResult }) {
  const { notes, model } = result;
  const items: React.ReactNode[] = [];

  if (notes.expiry?.kind === "expired") {
    items.push(
      <p key="expiry">
        <b className="text-ink-soft">This listing has expired.</b> It was valid for installations between{" "}
        {notes.expiry.ap} and {notes.expiry.ex} — check the installation date falls inside that window.
      </p>
    );
  } else if (notes.expiry?.kind === "expiring-soon") {
    items.push(
      <p key="expiry">
        <b className="text-ink-soft">Expiring soon —</b> this listing lapses on {notes.expiry.ex}, in{" "}
        {notes.expiry.days} days. After that it cannot be used for new installations unless FoxESS renews it.
      </p>
    );
  }

  if (notes.rebrand) {
    items.push(
      <p key="rebrand">
        <b className="text-ink-soft">Same system, two names:</b> <span className="tnum">1K5-BAT-4660</span> is
        the 1KOMMA5° rebrand of the <span className="tnum">EQ4800</span>. Every capacity matches at every stack
        size, so match whichever name appears on the paperwork and the equipment.
      </p>
    );
  }

  if (notes.ecs4800) {
    items.push(
      <p key="ecs4800">
        <b className="text-ink-soft">Do not confuse with</b> <span className="tnum">1K5-BAT-4660</span> or{" "}
        <span className="tnum">EQ4800</span>. They share the same module size and the same nominal capacity, but{" "}
        <span className="tnum">ECS4800</span> has a lower usable capacity at every size — compare the usable
        figure, not the nominal.
      </p>
    );
  }

  if (notes.cq7) {
    items.push(
      <p key="cq7">
        <b className="text-ink-soft">CQ7 variants:</b> the list also carries{" "}
        <span className="tnum">{model} (w)</span>, the cold-weather version with cell heating. Identical
        capacity, so identical STCs — match whichever string is on the paperwork.
      </p>
    );
  }

  if (notes.ep12) {
    items.push(
      <p key="ep12">
        <b className="text-ink-soft">Note:</b> the datasheet calls this <span className="tnum">EP12 Plus</span>;
        the CEC list records it as <span className="tnum">EP12 Plus (w)</span>. Use the CEC string on the
        paperwork.
      </p>
    );
  }

  if (items.length === 0) return null;

  return <div className="space-y-2.5 border-t border-rule pt-4 text-xs leading-relaxed text-ink-faint">{items}</div>;
}

function StackDiagram({ bricks, n }: { bricks: Brick[]; n: number }) {
  return (
    <div>
      <div aria-hidden="true" className="flex flex-col gap-0.5">
        {bricks.map((brick, i) => (
          <div
            key={i}
            className={`w-[104px] rounded border px-2 text-center text-[9.5px] font-semibold tracking-[0.02em] ${
              brick.kind === "m"
                ? "h-[22px] border-blue bg-blue/15 leading-[22px] text-blue"
                : "h-4 border-green/50 bg-green/15 leading-4 text-green-deep"
            }`}
          >
            {brick.label}
          </div>
        ))}
      </div>
      <p className="mt-2 max-w-[150px] text-[11px] leading-relaxed text-ink-faint">
        <b className="font-medium text-ink-soft">{n} modules</b> — one master on top, {n - 1} slave
        {n - 1 === 1 ? "" : "s"} below.
      </p>
    </div>
  );
}

function CheckPane({
  query,
  setQuery,
  verdict,
}: {
  query: string;
  setQuery: (v: string) => void;
  verdict: Verdict;
}) {
  return (
    <div className="p-5 sm:p-6 grid gap-4">
      <div>
        <label htmlFor="q-model" className="text-sm font-medium">
          Model number as written in the paperwork
        </label>
        <input
          id="q-model"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="CQ6-L5"
          autoComplete="off"
          spellCheck={false}
          className="mt-2.5 w-full rounded-lg border border-rule-strong bg-card px-3.5 py-2.5 font-mono text-sm tnum outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">Try</span>
        {EXAMPLE_MODELS.map((model) => (
          <button
            key={model}
            type="button"
            onClick={() => setQuery(model)}
            className="rounded-full border border-dashed border-rule-strong bg-wash px-2.5 py-1 font-mono text-[11px] tnum text-ink-faint transition-colors hover:border-solid hover:border-ink-soft hover:text-ink cursor-pointer"
          >
            {model}
          </button>
        ))}
      </div>

      <VerdictCard verdict={verdict} />
    </div>
  );
}

function VerdictCard({ verdict }: { verdict: Verdict }) {
  if (verdict.kind === "empty") {
    return (
      <Card tone="neutral" pill="Awaiting input" heading="Paste or type the model recorded on the paperwork">
        <p>
          Spacing, case and the AS4777 suffix are ignored — the check matches the model itself against the
          FoxESS rows of the CEC approved battery list.
        </p>
      </Card>
    );
  }

  if (verdict.kind === "match") {
    const { row, status, describe, visual } = verdict;
    const expired = status.kind === "expired";
    return (
      <Card tone={expired ? "warn" : "ok"} pill={expired ? "Listed, but expired" : "On the CEC list"} heading={row.m}>
        <p>
          <b>{row.use.toFixed(2)} kWh usable</b> · {row.nom.toFixed(2)} kWh nominal
        </p>
        <p className="mt-1.5">
          Valid for installations between <b>{row.ap}</b> and <b>{row.ex}</b>.
          {expired
            ? " This window has closed — check the installation date falls inside it."
            : status.kind === "expiring-soon"
              ? ` That is only ${status.days} days away.`
              : ""}
        </p>
        <p className="mt-2.5">
          <b>The photos must show:</b>
        </p>
        <ul className="mt-1.5 list-disc space-y-1 pl-4">
          {describe.map((bullet, i) => (
            <DescribeLine key={i} bullet={bullet} />
          ))}
        </ul>
        <VerdictVisual visual={visual} />
      </Card>
    );
  }

  if (verdict.kind === "module") {
    const { raw, series } = verdict;
    return (
      <Card tone="stop" pill="Not a CEC model" heading="That is one module, not the whole stack">
        <p>
          <span className="tnum">{raw}</span> is a single module from a <span className="tnum">{series.name}</span>{" "}
          stack. The paperwork has to name the whole stack, with the module count on the end.
        </p>
        <ul className="mt-2.5 list-disc space-y-1 pl-4">
          <li>
            2 modules → <span className="tnum">{series.fmt(2)}</span>
          </li>
          <li>
            4 modules → <span className="tnum">{series.fmt(4)}</span>
          </li>
          <li>
            {series.max} modules → <span className="tnum">{series.fmt(series.max)}</span>
          </li>
        </ul>
      </Card>
    );
  }

  return (
    <Card tone="stop" pill="No exact match" heading="Not found on the FoxESS rows of the CEC list">
      <p>
        <span className="tnum">{verdict.raw}</span> does not match an approved FoxESS model. The Clean Energy
        Regulator requires the exact listed string.
      </p>
      {verdict.near.length > 0 ? (
        <>
          <p className="mt-2.5">
            <b>Closest listed models:</b>
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {verdict.near.map((r) => (
              <li key={r.m}>
                <span className="tnum">{r.m}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-2.5">
          Use the <b>From the photos</b> tab to build the correct string from what the installation photos show.
        </p>
      )}
    </Card>
  );
}

function DescribeLine({ bullet }: { bullet: DescribeBullet }) {
  if (bullet.kind === "stack") {
    return (
      <li>
        one master <span className="tnum">{bullet.master}</span> on top of the stack, with {bullet.n - 1} × slave{" "}
        <span className="tnum">{bullet.slave}</span> below it — {bullet.n} modules
      </li>
    );
  }
  if (bullet.kind === "inverter") {
    return <li>a separate inverter — a stack is battery only</li>;
  }
  return (
    <li>
      one <span className="tnum">{bullet.model}</span> unit with a legible nameplate
    </li>
  );
}

function VerdictVisual({ visual }: { visual: Visual }) {
  if (!visual) return null;
  if (visual.kind === "stack") {
    return (
      <div aria-hidden="true" className="mt-3 flex flex-col gap-0.5">
        {visual.bricks.map((brick, i) => (
          <div
            key={i}
            className={`w-[112px] rounded border px-2 text-center text-[9.5px] font-semibold tracking-[0.02em] ${
              brick.kind === "m"
                ? "h-[22px] border-blue bg-blue/15 leading-[22px] text-blue"
                : "h-4 border-green/50 bg-green/15 leading-4 text-green-deep"
            }`}
          >
            {brick.label}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-3 max-w-[230px] overflow-hidden rounded-lg border border-rule">
      <Image
        src={PHOTO_SRC[visual.photo]}
        alt={`A ${visual.name} battery mounted on a wall.`}
        width={440}
        height={493}
        className="h-auto w-full bg-wash"
      />
    </div>
  );
}

function Card({
  tone,
  pill,
  heading,
  children,
}: {
  tone: "neutral" | "ok" | "warn" | "stop";
  pill: string;
  heading: string;
  children: React.ReactNode;
}) {
  const cardTone = {
    neutral: "border-rule bg-wash",
    ok: "border-green/30 bg-green/5",
    warn: "border-amber/30 bg-amber/5",
    stop: "border-red/30 bg-red/5",
  }[tone];
  const pillTone = {
    neutral: "bg-wash text-ink-soft ring-1 ring-inset ring-rule",
    ok: "bg-green/15 text-green-deep",
    warn: "bg-amber/15 text-amber-deep",
    stop: "bg-red/15 text-red-deep",
  }[tone];

  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${cardTone}`}>
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${pillTone}`}>
        {pill}
      </span>
      <h3 className="mt-2.5 text-sm font-medium break-words">{heading}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft [&_b]:font-medium [&_b]:text-ink">{children}</div>
    </div>
  );
}

function Field({
  n,
  title,
  help,
  children,
}: {
  n: number;
  title: string;
  help: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-md border border-rule bg-wash text-[11px] font-medium text-ink-faint">
          {n}
        </span>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="mt-1.5 max-w-sm text-xs text-ink-faint">{help}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function SegGroup({
  name,
  value,
  onChange,
  options,
  stacked,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; sub?: string }[];
  stacked?: boolean;
}) {
  return (
    <div className={stacked ? "flex flex-col gap-2" : "flex flex-wrap gap-2"} role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`flex flex-col gap-0.5 rounded-lg border px-3.5 py-2 text-left text-[13.5px] font-medium leading-tight transition-colors cursor-pointer ${
              stacked ? "w-full" : ""
            } ${
              active
                ? "border-blue bg-blue/10 text-blue ring-1 ring-inset ring-blue/40"
                : "border-rule bg-wash text-ink-soft hover:border-rule-strong"
            }`}
          >
            {option.label}
            {option.sub && (
              <span className={`text-[11px] font-normal tnum ${active ? "text-blue/80" : "text-ink-faint"}`}>
                {option.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function CountStepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-rule bg-wash px-1.5 py-1.5 w-fit">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="One fewer module"
        className="h-8 w-8 rounded-md border border-rule bg-card text-ink-soft leading-none hover:border-rule-strong hover:text-ink disabled:opacity-25 disabled:cursor-default transition-colors cursor-pointer"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tnum">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="One more module"
        className="h-8 w-8 rounded-md border border-rule bg-card text-ink-soft leading-none hover:border-rule-strong hover:text-ink disabled:opacity-25 disabled:cursor-default transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

function ExpectItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden
        className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md bg-green/15 text-[10px] font-bold text-green-deep"
      >
        ✓
      </span>
      <span className="text-ink-soft">{children}</span>
    </li>
  );
}

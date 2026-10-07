"use client";

import { useMemo, useState } from "react";
import {
  FAMS,
  tileSubLabel,
  computeModulesBuild,
  computeMixBuild,
  computeSingleBuild,
  computeVerdict,
  stackBricks,
  mixBricks,
  checkVisual,
  type BydFamily,
  type BuildResult,
  type Verdict,
  type Brick,
} from "@/lib/byd";

const EXAMPLE_MODELS = [
  "HVS 10.2",
  "HVM 16.6",
  "HVM+ 16.6",
  "HVB 17.8",
  "HVE 12.8-1",
  "LVS 16.0",
  "Battery-Box Premium LVL15.4",
];

type Tab = "build" | "check";

export default function BydFinder() {
  const [tab, setTab] = useState<Tab>("build");
  const [famId, setFamId] = useState("HVS");
  const [n, setN] = useState(4);
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [query, setQuery] = useState("");

  const today = useMemo(() => new Date(), []);
  const fam = useMemo(() => FAMS.find((f) => f.id === famId) ?? FAMS[0], [famId]);

  const result = useMemo<BuildResult>(() => {
    if (fam.kind === "single") return computeSingleBuild(fam, today);
    if (fam.kind === "mix") return computeMixBuild(fam, a, b, today);
    return computeModulesBuild(fam, n, today);
  }, [fam, n, a, b, today]);

  const verdict = useMemo(() => computeVerdict(query, today), [query, today]);

  function selectFam(id: string) {
    setFamId(id);
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
          fam={fam}
          n={n}
          a={a}
          b={b}
          result={result}
          onSelectFam={selectFam}
          onChangeN={setN}
          onChangeA={setA}
          onChangeB={setB}
        />
      ) : (
        <CheckPane query={query} setQuery={setQuery} verdict={verdict} />
      )}
    </section>
  );
}

function BuildPane({
  fam,
  n,
  a,
  b,
  result,
  onSelectFam,
  onChangeN,
  onChangeA,
  onChangeB,
}: {
  fam: BydFamily;
  n: number;
  a: number;
  b: number;
  result: BuildResult;
  onSelectFam: (id: string) => void;
  onChangeN: (n: number) => void;
  onChangeA: (n: number) => void;
  onChangeB: (n: number) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2">
      <div className="p-5 sm:p-6 grid gap-6 sm:border-r sm:border-rule">
        <Field
          n={1}
          title="Which series is installed?"
          help={
            <>
              See{" "}
              <a href="#series" className="text-blue underline underline-offset-2">
                Telling the series apart
              </a>{" "}
              below.
            </>
          }
        >
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Series">
            {FAMS.map((f) => {
              const active = f.id === fam.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onSelectFam(f.id)}
                  className={`flex flex-col gap-0.5 rounded-lg border px-3.5 py-2 text-left text-[13.5px] font-medium leading-tight transition-colors cursor-pointer ${
                    active
                      ? "border-blue bg-blue/10 text-blue ring-1 ring-inset ring-blue/40"
                      : "border-rule bg-wash text-ink-soft hover:border-rule-strong"
                  }`}
                >
                  {f.short || f.name}
                  <span className={`text-[11px] font-normal tnum ${active ? "text-blue/80" : "text-ink-faint"}`}>
                    {tileSubLabel(f)}
                  </span>
                </button>
              );
            })}
          </div>
        </Field>

        {fam.kind === "modules" && (
          <Field
            n={2}
            title="Modules in the stack"
            help="Count the battery modules only. The dark grey control unit on top is not a module and adds no capacity."
          >
            <div className="flex flex-wrap items-start gap-5">
              <div>
                <CountStepper value={n} min={fam.min} max={fam.max} onChange={onChangeN} />
                <p className="mt-1.5 text-xs text-ink-faint tnum">
                  {fam.min}–{fam.max} modules
                </p>
              </div>
              <StackDiagram bricks={stackBricks(fam, Math.min(Math.max(n, fam.min), fam.max))} />
            </div>
          </Field>
        )}

        {fam.kind === "mix" && (
          <Field n={2} title="Modules in the stack" help="HVE uses two module sizes. Count each size separately — the combination sets the model.">
            <div className="flex flex-wrap items-start gap-5">
              <div>
                <p className="text-[11px] font-semibold text-ink-faint tnum">4.29 kWh</p>
                <div className="mt-1.5">
                  <CountStepper value={a} min={0} max={fam.maxTotal} onChange={onChangeA} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-ink-faint tnum">6.43 kWh</p>
                <div className="mt-1.5">
                  <CountStepper value={b} min={0} max={fam.maxTotal} onChange={onChangeB} />
                </div>
              </div>
              <StackDiagram bricks={mixBricks(a, b)} />
            </div>
            <p className="mt-2.5 text-xs text-ink-faint tnum">1–{fam.maxTotal} modules in total</p>
          </Field>
        )}
      </div>

      <BuildResultPanel result={result} />
    </div>
  );
}

function BuildResultPanel({ result }: { result: BuildResult }) {
  return (
    <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">CEC approved model</p>
        <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum break-words">
          {result.model ?? "Not a listed combination"}
        </p>
        {result.bucket && (
          <div className="mt-2">
            <BucketPill bucket={result.bucket} expires={result.expires} days={result.days} />
          </div>
        )}
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
        <dt className="text-ink-faint">Usable capacity</dt>
        <dd className="tnum">{result.usable}</dd>
        <dt className="text-ink-faint">Nominal capacity</dt>
        <dd className="tnum">{result.nominal}</dd>
        <dt className="text-ink-faint">Module capacity</dt>
        <dd className="tnum">{result.moduleCap}</dd>
        <dt className="text-ink-faint">Number of modules</dt>
        <dd className="tnum">{result.moduleCount}</dd>
        <dt className="text-ink-faint">Approved</dt>
        <dd className="tnum">{result.approved}</dd>
        <dt className="text-ink-faint">Expires</dt>
        <dd className="tnum">{result.expires}</dd>
      </dl>

      <div className="border-t border-rule pt-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">What it looks like</p>
        <a
          href={`#acc-${result.accId}`}
          onClick={() => {
            const el = document.getElementById(`acc-${result.accId}`);
            if (el instanceof HTMLDetailsElement) el.open = true;
          }}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue underline underline-offset-2"
        >
          See {result.accName} below →
        </a>
      </div>

      <BuildNotes result={result} />
    </div>
  );
}

function BuildNotes({ result }: { result: BuildResult }) {
  if (result.notes.length === 0) return null;

  return (
    <div className="space-y-2.5 border-t border-rule pt-4 text-xs leading-relaxed text-ink-faint">
      {result.notes.map((note, i) => {
        if (note.kind === "not-listed") {
          return (
            <p key={i}>
              <b className="text-ink-soft">That combination is not on the CEC list.</b> HVE is listed only
              in the twelve combinations BYD submitted — try a different mix.
            </p>
          );
        }
        if (note.kind === "expired") {
          return (
            <p key={i}>
              <b className="text-ink-soft">This listing has expired.</b> Valid for installations between{" "}
              {note.ap} and {note.ex} — check the installation date falls inside that window.
            </p>
          );
        }
        if (note.kind === "expiring") {
          return (
            <p key={i}>
              <b className="text-ink-soft">Expiring soon —</b> this listing lapses on {note.ex}, in{" "}
              {note.days} days.
            </p>
          );
        }
        if (note.kind === "hvm-cross-check") {
          return (
            <p key={i}>
              <b className="text-ink-soft">Check it is not an HVM+.</b>{" "}
              <span className="tnum">{note.other}</span> has exactly the same capacity under a separate
              listing.
            </p>
          );
        }
        if (note.kind === "hvm-plus-cross-check") {
          return (
            <p key={i}>
              <b className="text-ink-soft">Check it is not an HVM.</b>{" "}
              <span className="tnum">{note.other}</span> has exactly the same capacity under the older
              listing.
            </p>
          );
        }
        return (
          <p key={i}>
            <b className="text-ink-soft">Each module is listed separately.</b> A rack of six is six ×{" "}
            <span className="tnum">LV Flex</span>, not a single larger model.
          </p>
        );
      })}
    </div>
  );
}

function BucketPill({
  bucket,
  expires,
  days,
}: {
  bucket: "expired" | "expiring" | "current";
  expires: string;
  days: number | null;
}) {
  const label =
    bucket === "expired"
      ? `CEC listing expired ${expires}`
      : bucket === "expiring"
        ? `Expires in ${days} days`
        : "Current CEC listing";
  const tone =
    bucket === "expired"
      ? "bg-red/15 text-red-deep"
      : bucket === "expiring"
        ? "bg-amber/15 text-amber-deep"
        : "bg-green/15 text-green-deep";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${tone}`}>
      {label}
    </span>
  );
}

function StackDiagram({ bricks }: { bricks: Brick[] }) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-0.5">
      {bricks.map((brick, i) => (
        <div
          key={i}
          className={`w-[108px] rounded border px-2 text-center text-[9.5px] font-semibold leading-4 ${
            brick.kind === "control"
              ? "h-[22px] border-blue bg-blue/15 leading-[22px] text-blue"
              : "h-4 border-green/50 bg-green/15 text-green-deep"
          }`}
        >
          {brick.label}
        </div>
      ))}
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
          placeholder="HVM 16.6"
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
          Spacing, case and punctuation are ignored — the check matches the model itself against the 45 BYD
          models on the CEC approved battery list.
        </p>
      </Card>
    );
  }

  if (verdict.kind === "match") {
    const { row, bucket, moduleCap, moduleCount, info, crossCheck, duplicate } = verdict;
    const tone = bucket === "current" ? "ok" : "warn";
    const pill =
      bucket === "expired" ? "Listed, but expired" : bucket === "expiring" ? "Listed — expiring soon" : "On the CEC list";
    const visual = checkVisual(info);

    return (
      <Card tone={tone} pill={pill} heading={row.m}>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13.5px]">
          <dt className="text-ink-faint">Usable capacity</dt>
          <dd className="tnum text-ink-soft">{row.use.toFixed(2)} kWh</dd>
          <dt className="text-ink-faint">Nominal capacity</dt>
          <dd className="tnum text-ink-soft">{row.nom.toFixed(2)} kWh</dd>
          <dt className="text-ink-faint">Module capacity</dt>
          <dd className="tnum text-ink-soft">{moduleCap}</dd>
          <dt className="text-ink-faint">Number of modules</dt>
          <dd className="tnum text-ink-soft">{moduleCount}</dd>
          <dt className="text-ink-faint">Approved</dt>
          <dd className="tnum text-ink-soft">{row.ap}</dd>
          <dt className="text-ink-faint">Expires</dt>
          <dd className="tnum text-ink-soft">{row.ex}</dd>
        </dl>

        {bucket === "expired" && <p className="mt-2.5">This window has closed — check the installation date falls inside it.</p>}

        {crossCheck === "HVM+" && (
          <p className="mt-2.5">
            <b>Confirm it is not an HVM+.</b> That series carries the same capacity under a separate listing.
          </p>
        )}
        {crossCheck === "HVM" && (
          <p className="mt-2.5">
            <b>Confirm it is not an HVM.</b> That series carries the same capacity under the older listing.
          </p>
        )}

        {visual && (
          <div className="mt-3">
            <StackDiagram bricks={visual} />
          </div>
        )}

        {duplicate && (
          <p className="mt-2.5 text-xs text-ink-faint">
            This model appears on the list more than once; the current listing is shown.
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card tone="stop" pill="No exact match" heading="Not found on the BYD rows of the CEC list">
      <p>
        <span className="tnum">{verdict.raw}</span> does not match an approved BYD model. The Clean Energy
        Regulator requires the exact listed string.
      </p>
      {verdict.near.length > 0 && (
        <>
          <p className="mt-2.5">
            <b>Closest listed models:</b>
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {verdict.near.map((r, i) => (
              <li key={i}>
                <span className="tnum">{r.m}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
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

"use client";

import { useMemo, useState } from "react";
import {
  SYS,
  FAMS,
  famsFor,
  computeBuild,
  computeVerdict,
  formatDate,
  formatKwh,
  type SystemKey,
  type Brick,
  type BuildResult,
  type Verdict,
} from "@/lib/alphaess";

type Tab = "build" | "check";

const EXAMPLE_MODELS = [
  "SMILE-G3-BAT-9.3S III",
  "SMILE-M-BAT-5P IV",
  "SMILE-BAT-14P II",
  "SMILE-BAT-8.2 PH VI",
  "SMILE-BAT-13.3P",
  "M38314-96SNW",
  "SMILE-B3-PLUS III",
];

export default function AlphaessFinder() {
  const [tab, setTab] = useState<Tab>("build");
  const [sysKey, setSysKey] = useState<SystemKey>(SYS[0].k);
  const [famId, setFamId] = useState<string>(famsFor(SYS[0].k)[0]);
  const [n, setN] = useState<number>(FAMS[famsFor(SYS[0].k)[0]].min);
  const [query, setQuery] = useState("");

  const today = useMemo(() => new Date(), []);
  const result = useMemo(() => computeBuild(sysKey, famId, n, today), [sysKey, famId, n, today]);
  const verdict = useMemo(() => computeVerdict(query, today), [query, today]);

  function selectSys(key: SystemKey) {
    setSysKey(key);
    const firstFamId = famsFor(key)[0];
    setFamId(firstFamId);
    setN(FAMS[firstFamId].min);
  }

  function selectFam(id: string) {
    setFamId(id);
    setN(FAMS[id].min);
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
          sysKey={sysKey}
          famId={famId}
          n={n}
          result={result}
          onSelectSys={selectSys}
          onSelectFam={selectFam}
          onChangeN={setN}
        />
      ) : (
        <CheckPane query={query} setQuery={setQuery} verdict={verdict} />
      )}
    </section>
  );
}

function BuildPane({
  sysKey,
  famId,
  n,
  result,
  onSelectSys,
  onSelectFam,
  onChangeN,
}: {
  sysKey: SystemKey;
  famId: string;
  n: number;
  result: BuildResult;
  onSelectSys: (key: SystemKey) => void;
  onSelectFam: (id: string) => void;
  onChangeN: (n: number) => void;
}) {
  const famIds = famsFor(sysKey);

  return (
    <div className="grid sm:grid-cols-2">
      <div className="p-5 sm:p-6 grid gap-6 sm:border-r sm:border-rule">
        <Field
          n={1}
          title="Which inverter is installed?"
          help={
            <>
              Check the inverter nameplate. See <a href="#systems" className="underline underline-offset-2 hover:text-ink">Telling the systems apart</a> below for more.
            </>
          }
        >
          <SegGroup
            name="sys"
            stacked
            value={sysKey}
            onChange={(v) => onSelectSys(v as SystemKey)}
            options={SYS.map((s) => ({ value: s.k, label: s.n, sub: s.sub }))}
          />
        </Field>

        <Field
          n={2}
          title="Which battery is installed?"
          help={famIds.length === 1 ? "Only one battery is listed for this inverter." : "Check the label on the battery itself where it is legible."}
        >
          <SegGroup
            name="fam"
            value={famId}
            onChange={onSelectFam}
            options={famIds.map((id) => ({ value: id, label: FAMS[id].n, sub: FAMS[id].sub }))}
          />
        </Field>

        {result.stepperVisible && (
          <Field n={3} title="How many battery modules?" help="Count the battery modules only. The inverter is not a module and adds no capacity.">
            <div className="flex flex-wrap items-start gap-5">
              <div>
                <CountStepper value={n} min={result.fam.min} max={result.fam.max} onChange={onChangeN} />
                <p className="mt-1.5 text-xs text-ink-faint tnum">
                  {result.fam.min}–{result.fam.max} modules listed
                </p>
              </div>
              <StackDiagram bricks={result.bricks} n={result.n} stax={result.fam.sys === "stax"} />
            </div>
          </Field>
        )}
      </div>

      <BuildResultPanel result={result} />
    </div>
  );
}

function BuildResultPanel({ result }: { result: BuildResult }) {
  const { row, fam, model } = result;

  return (
    <div className="p-5 sm:p-6 bg-wash/60 grid gap-4 content-start">
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">CEC approved model</p>
        <p className="mt-1.5 font-display font-extrabold text-xl sm:text-2xl tnum break-words">
          {model ?? "Not a listed combination"}
        </p>
        {row && (
          <div className="mt-2">
            <StatusPill result={result} />
          </div>
        )}
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm border-t border-rule pt-4">
        <dt className="text-ink-faint">Usable capacity</dt>
        <dd className="tnum">{row ? formatKwh(row.use) : "—"}</dd>
        <dt className="text-ink-faint">Nominal capacity</dt>
        <dd className="tnum">{row ? formatKwh(row.nom) : "—"}</dd>
        <dt className="text-ink-faint">Module capacity</dt>
        <dd className="tnum">{fam.modcap}</dd>
        <dt className="text-ink-faint">Number of modules</dt>
        <dd className="tnum">{result.n}</dd>
        <dt className="text-ink-faint">Approved</dt>
        <dd className="tnum">{row ? formatDate(row.ap) : "—"}</dd>
        <dt className="text-ink-faint">Expires</dt>
        <dd className="tnum">{row ? formatDate(row.ex) : "—"}</dd>
      </dl>

      <div className="border-t border-rule pt-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">What it looks like</p>
        <a
          href="#systems"
          onClick={() => openSystemRow(result.sysKey)}
          className="mt-2 inline-block text-sm font-medium text-blue hover:underline"
        >
          See {SYS.find((s) => s.k === result.sysKey)?.n} below →
        </a>
      </div>

      <BuildNotes result={result} />
    </div>
  );
}

function openSystemRow(sysKey: SystemKey) {
  const el = document.getElementById(`sys-${sysKey}`);
  if (el instanceof HTMLDetailsElement) el.open = true;
}

function StatusPill({ result }: { result: BuildResult }) {
  const expiredNote = result.notes.find((note) => note.kind === "expired");
  const expiringNote = result.notes.find((note) => note.kind === "expiring-soon");

  if (expiredNote) {
    return <Pill tone="stop">Expired listing</Pill>;
  }
  if (expiringNote && expiringNote.kind === "expiring-soon") {
    return (
      <Pill tone="warn">
        Expires in {expiringNote.days} day{expiringNote.days === 1 ? "" : "s"}
      </Pill>
    );
  }
  return <Pill tone="ok">Current CEC listing</Pill>;
}

function BuildNotes({ result }: { result: BuildResult }) {
  const items: React.ReactNode[] = [];

  for (const note of result.notes) {
    if (note.kind === "expired") {
      items.push(
        <p key="expired">
          <b className="text-ink-soft">This listing has expired.</b> It was valid from {formatDate(note.ap)} to{" "}
          {formatDate(note.ex)}. Check the installation date falls inside that window.
        </p>
      );
    } else if (note.kind === "expiring-soon") {
      items.push(
        <p key="expiring">
          <b className="text-ink-soft">This listing expires on {formatDate(note.ex)}.</b> Installations after
          that date need a current listing.
        </p>
      );
    } else {
      items.push(<p key={note.text}>{note.text}</p>);
    }
  }

  if (items.length === 0) return null;
  return <div className="space-y-2.5 border-t border-rule pt-4 text-xs leading-relaxed text-ink-faint">{items}</div>;
}

function StackDiagram({ bricks, n, stax }: { bricks: Brick[]; n: number; stax: boolean }) {
  return (
    <div>
      <div aria-hidden="true" className="flex flex-col gap-0.5">
        {bricks.map((brick, i) => (
          <div
            key={i}
            className={`w-[124px] rounded border px-2 text-center text-[9.5px] font-semibold tracking-[0.02em] ${
              brick.kind === "inverter"
                ? "h-[22px] border-blue bg-blue/15 leading-[22px] text-blue"
                : "h-4 border-green/50 bg-green/15 leading-4 text-green-deep"
            }`}
          >
            {brick.label}
          </div>
        ))}
      </div>
      <p className="mt-2 max-w-[160px] text-[11px] leading-relaxed text-ink-faint">
        <b className="font-medium text-ink-soft">
          {n} battery module{n === 1 ? "" : "s"}
        </b>
        {stax ? " inside the cabinet" : ""}.
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
          placeholder="SMILE-G3-BAT-9.3S III"
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
          Spacing, case and punctuation are ignored — the check matches the model itself against the 64 Alpha
          ESS rows of the CEC approved battery list.
        </p>
      </Card>
    );
  }

  if (verdict.kind === "match") {
    const { row, fam, sys, status } = verdict;
    const tone = status.kind === "expired" ? "warn" : status.kind === "expiring-soon" ? "warn" : "ok";
    const pill =
      status.kind === "expired" ? "Listed, but expired" : status.kind === "expiring-soon" ? "Listed — expiring soon" : "Listed";
    const head =
      status.kind === "expired"
        ? "Found on the CEC list — the listing has expired"
        : status.kind === "expiring-soon"
          ? `Found on the CEC list — ${status.days} day${status.days === 1 ? "" : "s"} remaining`
          : "Found on the CEC list";

    return (
      <Card tone={tone} pill={pill} heading={row.m}>
        {status.kind === "expired" && (
          <p>
            Valid from {formatDate(status.ap)} to {formatDate(status.ex)}. Check the installation date falls
            inside that window.
          </p>
        )}
        <h4 className="mt-1 font-medium text-ink">{head}</h4>
        <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-ink-faint">Usable capacity</dt>
          <dd className="tnum text-ink-soft">{formatKwh(row.use)}</dd>
          <dt className="text-ink-faint">Nominal capacity</dt>
          <dd className="tnum text-ink-soft">{formatKwh(row.nom)}</dd>
          <dt className="text-ink-faint">Module capacity</dt>
          <dd className="tnum text-ink-soft">{fam?.modcap ?? "—"}</dd>
          <dt className="text-ink-faint">Number of modules</dt>
          <dd className="tnum text-ink-soft">{row.n}</dd>
          <dt className="text-ink-faint">Inverter</dt>
          <dd className="text-ink-soft">{sys?.n ?? "—"}</dd>
          <dt className="text-ink-faint">Approved</dt>
          <dd className="tnum text-ink-soft">{formatDate(row.ap)}</dd>
          <dt className="text-ink-faint">Expires</dt>
          <dd className="tnum text-ink-soft">{formatDate(row.ex)}</dd>
        </dl>
        {fam?.note && <p className="mt-2.5">{fam.note}</p>}
      </Card>
    );
  }

  return (
    <Card tone="stop" pill="Not on the CEC list" heading="No Alpha ESS model matches that">
      <p>Check the spelling against the nameplate.</p>
      {verdict.near.length > 0 && (
        <>
          <p className="mt-2.5">
            <b>The closest listed models are:</b>
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {verdict.near.map((r) => (
              <li key={r.m}>
                <span className="tnum">{r.m}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}

function Pill({ tone, children }: { tone: "stop" | "warn" | "ok"; children: React.ReactNode }) {
  const toneClasses = {
    stop: "bg-red/15 text-red-deep",
    warn: "bg-amber/15 text-amber-deep",
    ok: "bg-green/15 text-green-deep",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${toneClasses}`}>
      {children}
    </span>
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

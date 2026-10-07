"use client";

import { Fragment, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  ACC,
  famById,
  accordionStats,
  accordionPills,
  comparisonColumns,
  specRows,
  type AccRow,
  type BydFamily,
  type ComparisonColumn,
  type PhotoKey,
} from "@/lib/byd";

const PHOTO_SRC: Record<PhotoKey, string> = {
  LVL: "/byd/lvl.jpg",
  FLEX: "/byd/lv-flex.jpg",
  HV: "/byd/hv.jpg",
  LVS: "/byd/lvs.jpg",
  HVE: "/byd/hve.jpg",
  HVB: "/byd/hvb.jpg",
};

const PHOTO_DIMS: Record<PhotoKey, { w: number; h: number }> = {
  LVL: { w: 460, h: 460 },
  FLEX: { w: 460, h: 460 },
  HV: { w: 460, h: 460 },
  LVS: { w: 420, h: 560 },
  HVE: { w: 460, h: 492 },
  HVB: { w: 460, h: 460 },
};

export default function SeriesAccordion() {
  const today = useMemo(() => new Date(), []);

  // Open the accordion row matching the current hash — on load and on
  // navigation (e.g. the finder's "See X below" link, or a direct #acc-HVE link).
  useEffect(() => {
    function openFromHash() {
      if (!location.hash) return;
      const el = document.querySelector(location.hash);
      if (el instanceof HTMLDetailsElement) el.open = true;
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-2">
      {ACC.map((row) => (
        <AccordionItem key={row.id} row={row} today={today} />
      ))}
    </div>
  );
}

function AccordionItem({ row, today }: { row: AccRow; today: Date }) {
  const stats = accordionStats(row);
  const pills = accordionPills(row, today);
  const dims = PHOTO_DIMS[row.photo];

  return (
    <details id={`acc-${row.id}`} className="group overflow-hidden rounded-xl border border-rule bg-card open:border-blue/40">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 px-4 py-3.5 hover:bg-wash [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="w-4 shrink-0 text-[11px] text-ink-faint transition-transform group-open:rotate-90">
          ▶
        </span>
        <span className="min-w-[150px] text-[15.5px] font-semibold">{row.name}</span>
        <span className="text-[13px] text-ink-faint tnum">
          {stats.distinctModelCount} model{stats.distinctModelCount === 1 ? "" : "s"} · {stats.capRangeLabel}
        </span>
        <span className="ml-auto flex flex-wrap gap-1.5">
          {pills.map((pill, i) => (
            <Pill key={i} tone={pill.tone}>
              {pill.label}
            </Pill>
          ))}
        </span>
      </summary>

      <div className="grid gap-5 border-t border-rule px-4 pb-5 pt-4 sm:grid-cols-[1fr_230px]">
        <div>
          {row.famIds.length > 1 ? (
            <ComparisonTable row={row} />
          ) : (
            <SpecList fam={famById(row.famIds[0])} />
          )}
          <p className="mt-3.5 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">{row.desc}</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-rule">
          <Image
            src={PHOTO_SRC[row.photo]}
            alt={row.name}
            width={dims.w}
            height={dims.h}
            className="h-auto max-h-[330px] w-full bg-wash object-contain"
          />
        </div>
      </div>
    </details>
  );
}

function ComparisonTable({ row }: { row: AccRow }) {
  const cols = comparisonColumns(row);
  const specLines: { label: string; get: (c: ComparisonColumn) => string }[] = [
    { label: "Module capacity", get: (c) => c.moduleCap },
    { label: "Number of modules", get: (c) => c.moduleRange },
    { label: "Total capacity", get: (c) => c.totalRange },
    { label: "CEC expiry", get: (c) => c.expiryList },
  ];

  return (
    <table className="mt-1 w-full max-w-[440px] border-collapse text-[13.5px]">
      <thead>
        <tr>
          <th className="pb-2 pr-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-blue" />
          {cols.map((c) => (
            <th key={c.famName} className="pb-2 pr-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-blue">
              {c.famName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {specLines.map((line) => (
          <tr key={line.label} className="border-b border-rule last:border-b-0">
            <td className="py-1.5 pr-3.5 text-ink-faint">{line.label}</td>
            {cols.map((c) => (
              <td key={c.famName} className="py-1.5 pr-3.5 font-medium tnum text-ink">
                {line.get(c)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SpecList({ fam }: { fam: BydFamily }) {
  const rows = specRows(fam);
  return (
    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13.5px]">
      {rows.map((r) => (
        <Fragment key={r.label}>
          <dt className="text-ink-faint">{r.label}</dt>
          <dd className="font-medium tnum text-ink">{r.value}</dd>
        </Fragment>
      ))}
    </dl>
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

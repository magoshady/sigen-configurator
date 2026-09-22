export type Stat = { value: string; label: string };

/** The title + stat-tile row shared by every brand's finder page. */
export function BrandHero({
  title,
  description,
  stats,
}: {
  title: React.ReactNode;
  description?: string;
  stats: Stat[];
}) {
  return (
    <section className="pt-14 pb-10 sm:pt-20">
      <h1 className="font-display font-extrabold text-[2.6rem] sm:text-6xl leading-[1.05] tracking-[-0.03em]">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          {description}
        </p>
      )}

      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              {stat.label}
            </dt>
            <dd className="font-display font-extrabold text-2xl tnum tracking-[-0.02em]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

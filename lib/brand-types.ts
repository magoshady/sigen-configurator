/** Static metadata describing one battery brand's finder. */
export type BrandMeta = {
  /** URL-safe identifier, e.g. "sigenergy" */
  slug: string;
  /** Name shown in the brand nav tab */
  label: string;
  /** Route for this brand's finder page */
  href: string;
  /** Manufacturer name for the footer's non-affiliation disclaimer */
  manufacturer: string;
  /** Source described in the footer's "model data is derived from…" line */
  dataSource: string;
};

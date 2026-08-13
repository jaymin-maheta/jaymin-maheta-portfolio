// Not imported anywhere at runtime — exists so Tailwind's content scanner
// finds these literal class strings and never purges them, since MetricsGrid,
// FlowDiagram and TechStackGrid build class names from data-driven template
// literals that the scanner can't statically resolve.
export const TAILWIND_SAFELIST = `
  from-sky-500 to-blue-600
  from-orange-500 to-amber-600
  from-emerald-500 to-emerald-600
  from-violet-500 to-purple-600
  from-slate-700 to-slate-900
  border-t-sky-500 border-t-orange-500 border-t-emerald-500 border-t-violet-500
  bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300
  bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300
  bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300
  bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300
  stroke-brand-blue stroke-emerald-500
  text-brand-blue-dark text-emerald-600 dark:text-emerald-400
`;

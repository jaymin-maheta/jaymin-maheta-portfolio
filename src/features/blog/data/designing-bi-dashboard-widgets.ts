import type { BlogPost } from "../types";

export const designingBiDashboardWidgets: BlogPost = {
  meta: {
    slug: "designing-bi-dashboard-widgets",
    title: "Designing BI Dashboard Widgets People Can Actually Read at a Glance",
    excerpt:
      "Valyxto's dashboard turns any saved report into a drag-and-drop chart widget. Designing a chart that has to work for data nobody has seen yet is a different problem.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
  intro:
    "Most dashboard design starts from known data — you see the numbers, then design a chart around them. Valyxto's BI dashboard inverted that: a dynamic report builder lets users define their own entities, joins and filters, then drop the saved report onto a Gridster grid as a live widget. I had to design a chart system that would render legibly for data nobody had defined yet, at whatever size the user resized the widget to.",
  sections: [
    {
      heading: "Design the widget types, not the widgets",
      paragraphs: [
        "Since I couldn't design each report's visualization individually, the actual design deliverable was a small set of widget archetypes — metric tile, bar, donut, line, gauge — each with clear rules for when it applies. A metric tile works for any single aggregate value; a donut only makes sense below roughly six categories before it becomes unreadable; a line chart needs an inherently ordered axis like time. Those rules had to be legible enough that a non-designer choosing a chart type for their own report would pick correctly most of the time.",
        "That constraint pushed the design toward fewer, more disciplined chart types rather than a comprehensive charting library's worth of options. Every additional chart type is another shape that has to look right at three different Gridster widget sizes, in both light and dark mode, with real business data that might be sparse, might be a single row, or might have forty categories the user didn't expect.",
      ],
    },
    {
      heading: "A widget has to survive being resized to a quarter of its designed size",
      paragraphs: [
        "Gridster's drag-and-drop resizing means a chart designed at a comfortable 4-column width can get dragged down to a 1-column sliver, and it still has to communicate something useful, not just render garbled labels. I designed each widget type with an explicit minimum viable size and a graceful degradation path — axis labels drop before the chart itself breaks, a legend collapses into a tooltip before it overlaps the plot area.",
        "The metric tile widget is the one that gets used disproportionately once real users start building their own dashboards, because it's the one chart type that degrades to almost nothing — a number and a label — and still works at the smallest Gridster size. Designing that as the 'default, safe' widget type, and making it the visual anchor of the widget palette, reduced how often users built dashboards with charts that broke the moment they resized them.",
      ],
      bullets: [
        "Define a minimum usable size per widget type before designing its largest, most detailed state",
        "Design label and legend collapse behavior explicitly — don't let overflow be an accident of the charting library's defaults",
        "Make the safest, most resize-tolerant widget type (usually a metric tile) the visually obvious default choice",
      ],
    },
    {
      heading: "Color has to mean something consistent across every possible report",
      paragraphs: [
        "Because any report can become a widget, color couldn't be assigned per-chart by an artist's eye — it needed a systematic palette that stays distinguishable across an arbitrary number of categories, works in both themes, and doesn't accidentally imply meaning it shouldn't (a random category landing on red next to a status widget that legitimately uses red for 'overdue' is confusing). I built a fixed, ordered categorical palette that every chart pulls from by index, so category five is always the same hue everywhere in the product, and reserved red/amber/green exclusively for genuine status semantics, never assigned it to an arbitrary data category.",
      ],
    },
    {
      heading: "What surprised me building this",
      paragraphs: [
        "The hardest design problem wasn't the charts — it was the empty and sparse-data states. A brand-new saved report with zero rows, or a donut chart with a single 100% category, needed just as much deliberate design attention as a fully populated dashboard, because those are exactly the states a user hits first, before they trust the widget enough to keep using it.",
      ],
    },
  ],
  takeaway:
    "Designing a dashboard where users define their own data means designing constraints and archetypes, not individual charts — the real work is making sure every widget still communicates something true at its smallest size and its emptiest state.",
};

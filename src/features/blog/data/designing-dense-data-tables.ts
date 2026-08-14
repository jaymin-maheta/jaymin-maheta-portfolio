import type { BlogPost } from "../types";

export const designingDenseDataTables: BlogPost = {
  meta: {
    slug: "designing-dense-data-tables",
    title: "Designing Data Tables That Don't Overwhelm the People Using Them",
    excerpt:
      "Across a hospital MIS, a care-home roster and a distribution ERP, the table is the product. Here's how I design one that stays usable at 40+ columns.",
    tag: "UI/UX Design",
    readTime: "7 min",
    publishedLabel: "Field notes",
    seoTitle: "Designing Data Tables That Don't Overwhelm Users",
    seoDescription:
      "How to keep a 40+ column table usable, from a hospital MIS, a care-home roster and a distribution ERP.",
    seoKeywords: "designing dense data tables ux, enterprise data table design, ux for complex dashboards",
  },
  intro:
    "On BMC, a hospital management system, the MIS reporting module alone has 40+ report screens, most of them tables. On Valyxto, a distribution ERP, almost every transactional screen is a server-side-paginated list. When the product is fundamentally operational, the table isn't a supporting component — it's the interface. Designing one that a billing clerk or warehouse manager can actually work in for eight hours is a different discipline than designing a marketing site's feature comparison table.",
  sections: [
    {
      heading: "Start from the task, not the schema",
      paragraphs: [
        "The instinct when designing a data table is to open the database schema and turn every column into a table column. That's how you end up with a 22-column patient list that nobody can scan. On BMC's front-desk registration screen, the underlying patient record has dozens of fields — but the table only surfaces four: Patient, Episode, Doctor, Status. Everything else lives one click away in a detail view.",
        "The question I ask before adding a column isn't 'is this data available?' — it's 'does someone scanning this list at speed need this value to decide their next click?' On Rota's roster board, that discipline is what keeps 'Who's On' readable in the middle of a live shift, when a care coordinator has seconds, not minutes, to find who's missing.",
      ],
    },
    {
      heading: "Density is a spectrum, and enterprise users want the dense end",
      paragraphs: [
        "Consumer design trends push toward generous whitespace and card-based layouts. Enterprise operators — accountants on Compito reviewing timesheets, warehouse staff on Valyxto checking bin-level stock — actively want more rows visible per screen, not fewer, because their job is comparing many rows at once. Designing 'friendly' whitespace into a table these users scan hundreds of times a day just means more scrolling.",
        "The tradeoff I actually design for is row height versus scan speed: compact enough that 15-20 rows fit without scrolling on a laptop screen, but with enough vertical padding and a clear hover/selected state that a user's eye doesn't lose its row when they glance away and back. That number came directly from designing BMC and Rota for the small-to-large laptop range hospital and care-home staff actually use, not a 27-inch monitor.",
      ],
      bullets: [
        "Right-align numeric and currency columns so totals and comparisons scan vertically",
        "Reserve bold weight for the one column that answers 'which row is this' — usually name or ID — not for every header",
        "Design the hover and selected-row states before the empty state; they're used far more often",
      ],
    },
    {
      heading: "Filters and column choice are part of the table's design, not a toolbar afterthought",
      paragraphs: [
        "Every dense table I've designed for these products ends up needing the same three affordances: a fast text search, a small set of high-value filters (status, date range, owner), and — on the more complex screens — user-controlled column visibility. Designing these as a bolted-on toolbar above a static table misses that they're what makes 40+ possible columns usable in the first place.",
        "On Valyxto's report builder, this went further: because the underlying entities, joins and filters are genuinely dynamic, the table itself had to be designed as a rendering target for whatever columns a saved report defines, not a fixed layout. That meant designing column headers, sort affordances and cell formatting (currency, date, badge) as a small design system of cell types, reusable across any report shape, rather than styling one table at a time.",
      ],
    },
    {
      heading: "What I'd tell a designer handed their first operational dashboard",
      paragraphs: [
        "Sit with the actual user for an hour before opening Figma. The columns, the sort order, the filters that matter — they're rarely what the ticket says, they're whatever the person doing this task forty times a day has already worked out for themselves, usually in an Excel sheet you should be looking at.",
      ],
    },
  ],
  takeaway:
    "A dense table isn't a design failure to be avoided — for an operational product, it's the correct answer. The design work is in deciding which columns earn their place, not in trying to make the table look less like a table.",
};

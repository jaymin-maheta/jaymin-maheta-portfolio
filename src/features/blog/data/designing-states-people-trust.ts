import type { BlogPost } from "../types";

export const designingStatesPeopleTrust: BlogPost = {
  meta: {
    slug: "designing-states-people-trust",
    title: "Designing Empty, Loading and Error States People Actually Trust",
    excerpt:
      "A blank screen and a broken screen look identical to most users. On safety-critical and financial products, that ambiguity is the actual design bug.",
    tag: "UI/UX Design",
    readTime: "6 min",
    publishedLabel: "Field notes",
  },
  intro:
    "On rota_web, the 'Who's On' report tells a care coordinator who is physically present in a building of vulnerable residents, right now. If that screen shows nothing, the coordinator needs to instantly know whether that means 'no one is on shift' or 'this failed to load' — because acting on the wrong interpretation is a safety incident, not a UX inconvenience. Most design systems treat empty and error states as an afterthought pass at the end. On products like this, they're core to the design brief from day one.",
  sections: [
    {
      heading: "Empty, loading and error are three different screens, not one",
      paragraphs: [
        "A common shortcut is designing a single 'nothing to show' state and reusing it for empty results, a slow network and an actual failure. Users can't tell those apart, and worse, they stop trusting the screen — if 'no data' sometimes secretly means 'broken,' every legitimately empty state starts to feel suspicious.",
        "I design all three as distinct, deliberately different visuals: loading gets a skeleton that mirrors the real layout so the eye already knows where data will land; empty gets a specific, contextual message ('No shifts scheduled for this department today') rather than a generic illustration; error gets a visibly different treatment — a warning color, a retry action, and language that says what failed, not just that something did.",
      ],
    },
    {
      heading: "On a financial screen, ambiguity has a cost",
      paragraphs: [
        "Valyxto's AR/AP aging reports and Compito's billable-hour timesheets share the same risk: a table that appears empty because of a failed filter combination looks identical to a table that's correctly empty because there's genuinely nothing overdue. On a financial screen, a user who can't tell the difference either escalates a false alarm or — worse — trusts a broken screen and misses something real.",
        "The design fix isn't clever copywriting, it's structural: every filtered list state shows the active filters as visible chips even when the result is empty, so 'zero results for this specific query' is self-evidently different from 'this screen is broken.' That one decision — always showing what's filtering the data, even at zero rows — resolved more support confusion on these products than any error-message wording ever did.",
      ],
      bullets: [
        "Design loading states as skeletons of the real layout, not a generic spinner that hides structure",
        "Make empty states specific to the query ('No results for this filter') instead of generic ('No data')",
        "Give error states a distinct visual language — color, icon, retry action — never a bare reuse of the empty state",
      ],
    },
    {
      heading: "Designing failure for a safety-critical screen specifically",
      paragraphs: [
        "For 'Who's On' on Rota, I treated the failure state as seriously as the happy path, because the cost of misreading it is highest exactly when the coordinator needs it most — a busy shift change. The design shows a clear, persistent banner distinguishing 'last updated 2 minutes ago, connection lost' from 'no staff currently on shift,' rather than letting a stale cache silently masquerade as current data.",
        "That's a deliberate design decision to surface staleness rather than hide it. A polished interface that quietly goes stale is more dangerous on a safety-critical screen than an honest one that visibly tells you it's out of date.",
      ],
    },
    {
      heading: "What I design first, not last",
      paragraphs: [
        "On every project since Rota, I now design the empty, loading and error variants of a screen in the same Figma pass as the populated one — often before the populated state, because it forces the real question early: what does this component actually need to communicate when it has nothing, or when it's lying to you a little because the network is slow.",
      ],
    },
  ],
  takeaway:
    "Users don't distinguish 'empty' from 'broken' unless the design does it for them explicitly — and on a safety-critical or financial screen, that ambiguity isn't a minor UX gap, it's the difference between a correct decision and an incident.",
};
